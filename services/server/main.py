import json
import os
import uuid
from io import BytesIO
from typing import List
from typing import Optional

import albumentations as A
import augmentations
import cv2
import folder_actions
import numpy as np
import pandas as pd
from balance import Balance
from fastapi import Cookie
from fastapi import FastAPI
from fastapi import File
from fastapi import Form
from fastapi import HTTPException
from fastapi import Response
from fastapi import UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image
from split import SplitDataset

SERVER_BASE_URL = os.environ["SERVER_BASE_URL"]

app = FastAPI()

app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/img_dataset", StaticFiles(directory="img_dataset"), name="img_dataset")

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.mount(
    "/image_previews", StaticFiles(directory="image_previews"), name="image_previews"
)
app.mount(
    "/train_val_csv", StaticFiles(directory="train_val_csv"), name="train_val_csv"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_image_into_numpy_array(data):
    return np.array(Image.open(BytesIO(data)))


def hinted_tuple_hook(obj):
    if "__tuple__" in obj:
        return tuple(obj["items"])
    else:
        return obj


@app.post("/transform_image", status_code=200)
async def transform_image(
    response: Response,
    preview: bool = False,
    parameters: Optional[str] = Form(None),
    transformation: Optional[int] = Form(None),
    transformation_step: Optional[int] = Form(None),
    img_url: Optional[str] = Form(None),
    preview_url: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    id: Optional[str] = Cookie(None),
    step_count: Optional[str] = Cookie(None),
):
    if id is None:
        if image is None:
            raise HTTPException(status_code=400, detail="Image has to be uploaded")
        elif img_url is not None or preview_url is not None:
            raise HTTPException(
                status_code=400,
                detail="Image has to be added to the history before refering it",
            )

        id = str(uuid.uuid4())
        response.set_cookie(key="id", value=id)
        folder_actions.mkdir_p("images/" + id)
        step_count = "0"

    if step_count is None or image is not None:
        step_count = "0"
        response.set_cookie(key="step_count", value=step_count)
    elif not preview:
        step_count = str(int(step_count) + 1)
        response.set_cookie(key="step_count", value=step_count)

    img_extension = ".png"

    if image is not None:
        img_extension = "." + image.filename.split(".")[1]

        image = load_image_into_numpy_array(await image.read())

        folder_actions.delete_files(folder="images/" + str(id))

    elif img_url is not None or preview_url is not None:
        img_url_new = "images/" + str(id)
        if img_url is not None:
            if transformation_step is None:
                raise HTTPException(
                    status_code=400, detail="transformation_step field required"
                )

            img_extension = "." + img_url.split(".")[1]

            img_url_new += (
                "/transformed_img_" + str(transformation_step) + img_extension
            )

            if not preview:
                step_count = str(int(transformation_step) + 1)
                response.set_cookie(key="step_count", value=step_count)

                folder_actions.delete_files(
                    folder="images/" + str(id),
                    split_string="transformed_img_",
                    low=int(transformation_step),
                )
        elif preview_url is not None:
            img_extension = "." + preview_url.split(".")[1]

            img_url_new = "image_previews/" + str(id) + img_extension

        image = cv2.imread(img_url_new)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    else:
        raise HTTPException(status_code=400, detail="img_url or preview_url required")

    transformed_image = image

    if img_url is not None or preview_url is None:
        parameters = json.loads(json.loads(parameters), object_hook=hinted_tuple_hook)
        transform = augmentations.augmentations_dict[transformation](**parameters)

        transformed = transform(image=image)
        transformed_image = transformed["image"]

    im = Image.fromarray(transformed_image)
    img_path = "images/" + str(id)

    if preview:
        img_path = "image_previews/" + str(id) + img_extension
    else:
        img_path += "/transformed_img_" + str(step_count) + img_extension

    im.save(img_path)

    return {"img_path": SERVER_BASE_URL + img_path}


@app.post("/reset_images")
async def reset_images(response: Response, id: Optional[str] = Cookie(None)):
    if not id:
        return {"done": False}

    response.delete_cookie("step_count")
    folder_actions.delete_files("images/" + str(id))

    return {"done": True}


@app.get("/transformed_images")
async def get_transformed_images(id: Optional[str] = Cookie(None)):

    if id is None:
        return {"transformed_images": []}

    transformed_images = [
        SERVER_BASE_URL + "images/" + str(id) + "/" + filename
        for filename in folder_actions.get_file_names("images/" + str(id))
    ]

    return {"transformed_images": list(transformed_images)}


@app.post("/transform_images")
async def transform_images(
    response: Response,
    parameters: str = Form(...),
    transformations: str = Form(...),
    num_iterations: int = Form(...),
    class_id: str = Form(...),
    images: List[UploadFile] = File(...),
    id: Optional[str] = Cookie(None),
):

    if id is None:
        id = str(uuid.uuid4())
        response.set_cookie(key="id", value=id)
        folder_actions.mkdir_p("images/" + id)

    base_img_path = "img_dataset/" + class_id + "/"
    folder_actions.mkdir_p(base_img_path)

    parameters = json.loads(json.loads(parameters), object_hook=hinted_tuple_hook)
    transformations = json.loads(
        json.loads(transformations), object_hook=hinted_tuple_hook
    )

    transform = A.Compose(
        [
            augmentations.augmentations_dict[transformation](**parameters[idx])
            for idx, transformation in enumerate(transformations)
        ]
    )

    img_names = [image.filename for image in images]
    images = [load_image_into_numpy_array(await image.read()) for image in images]

    base_img_path += str(id)

    transformed_images = []

    for idx in range(num_iterations):
        for i in range(len(images)):
            transformed = transform(image=images[i])
            images[i] = transformed["image"]
            transformed_images.append(
                {
                    "image": images[i],
                    "path": base_img_path
                    + str(idx)
                    + "_"
                    + str(uuid.uuid1())
                    + "_"
                    + img_names[i],
                }
            )

    for i in range(len(transformed_images)):
        image = transformed_images[i]
        im = Image.fromarray(image["image"])
        im.save(image["path"])

    return {
        "done": True,
        "images": [SERVER_BASE_URL + image["path"] for image in transformed_images],
    }


@app.get("/class_counts")
async def get_class_counts():
    img_df = pd.DataFrame(columns=["image", "label"])

    for dirname, _, filenames in os.walk("img_dataset"):
        for filename in filenames:
            class_id = dirname.split("/")[1]
            img_df.loc[len(img_df.index)] = [os.path.join(dirname, filename), class_id]

    img_df = img_df.groupby(["label"]).size().reset_index(name="counts")

    return {"class_counts": img_df.set_index("label").T.to_dict()}


@app.post("/balance_dataset")
async def balance_dataset(min_samples: Optional[int] = Form(None)):
    img_df = pd.DataFrame(columns=["image", "label"])

    done = False

    for dirname, _, filenames in os.walk("img_dataset"):
        for filename in filenames:
            done = True
            class_id = dirname.split("/")[1]
            img_df.loc[len(img_df.index)] = [os.path.join(dirname, filename), class_id]

    if not done:
        return {"done": done}

    balance_obj = Balance(img_df, min_samples)
    balanced_class_counts, balanced_img_paths = balance_obj.balance()

    return {
        "done": True,
        "balanced_class_counts": balanced_class_counts,
        "balanced_img_paths": balanced_img_paths,
    }


@app.post("/split_dataset")
async def split_dataset(
    response: Response,
    split_percentage: Optional[float] = Form(None),
    id: Optional[str] = Cookie(None),
):
    if id is None:
        id = str(uuid.uuid4())
        response.set_cookie(key="id", value=id)
        folder_actions.mkdir_p("images/" + id)

    img_df = pd.DataFrame(columns=["image", "label"])

    done = False

    for dirname, _, filenames in os.walk("img_dataset"):
        for filename in filenames:
            done = True
            class_id = dirname.split("/")[1]
            img_df.loc[len(img_df.index)] = [
                os.path.join(SERVER_BASE_URL, dirname, filename),
                class_id,
            ]

    if not done:
        return {"done": done}

    split_obj = SplitDataset(img_df, split_percentage)
    xtrain, xval = split_obj.split()

    xtrain_counts = (
        xtrain.groupby(["label"])
        .size()
        .reset_index(name="counts")
        .set_index("label")
        .T.to_dict()
    )

    xval_counts = (
        xval.groupby(["label"])
        .size()
        .reset_index(name="counts")
        .set_index("label")
        .T.to_dict()
    )

    img_path = "train_val_csv/" + str(id)

    xtrain.to_csv(img_path + "_train.csv")
    xval.to_csv(img_path + "_val.csv")

    img_path = SERVER_BASE_URL + img_path

    return {
        "done": True,
        "csv": {
            "train": img_path + "_train.csv",
            "val": img_path + "_val.csv",
        },
        "class_counts": {"train": xtrain_counts, "val": xval_counts},
    }


@app.delete("/dataset_images")
async def delete_dataset_images(images: str = Form(...)):
    images = json.loads(json.loads(images))

    for i in range(len(images)):
        img_path = images[i]
        img_path = img_path.split(SERVER_BASE_URL)[1]
        os.remove(img_path)

    return {"done": True}
