import json
import os
import uuid
from io import BytesIO
from typing import Optional, List
import augmentations
import albumentations as A
import cv2
import folder_actions
import numpy as np
from fastapi import Cookie
from fastapi import FastAPI
from fastapi import File
from fastapi import Form
from fastapi import Response
from fastapi import UploadFile
from fastapi.staticfiles import StaticFiles
from PIL import Image

SERVER_BASE_URL = os.environ["SERVER_BASE_URL"]

app = FastAPI()

app.mount("/images", StaticFiles(directory="images"), name="images")
app.mount("/img_dataset", StaticFiles(directory="img_dataset"), name="img_dataset")


def load_image_into_numpy_array(data):
    return np.array(Image.open(BytesIO(data)))


def hinted_tuple_hook(obj):
    if "__tuple__" in obj:
        return tuple(obj["items"])
    else:
        return obj


@app.post("/transform_image")
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
        id = str(uuid.uuid4())
        print(id)
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
                return {"error": "transformation_step field required"}

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

            img_url_new += "/preview_img" + img_extension

        image = cv2.imread(img_url_new)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    else:
        return {"error": "img_url or preview_url required"}

    transformed_image = image

    if img_url is not None or preview_url is None:
        parameters = json.loads(json.loads(parameters), object_hook=hinted_tuple_hook)
        transform = augmentations.augmentations_dict[transformation](**parameters)

        transformed = transform(image=image)
        transformed_image = transformed["image"]

    im = Image.fromarray(transformed_image)
    img_path = "images/" + str(id)

    if preview:
        img_path += "/preview_img" + img_extension
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

    if not id:
        return {"transformed_images": []}

    transformed_images = [
        SERVER_BASE_URL + "images/" + str(id) + "/" + filename
        for filename in filter(
            lambda filename: filename.split(".")[0] != "preview_img",
            folder_actions.get_file_names("images/" + str(id)),
        )
    ]

    return {"transformed_images": list(transformed_images)}


@app.post("/transform_images")
async def transform_images(
    parameters: str = Form(...),
    transformations: str = Form(...),
    num_iterations: int = Form(...),
    class_id: int = Form(...),
    images: List[UploadFile] = File(...),
    id: Optional[str] = Cookie(None),
):
    base_img_path = "img_dataset/" + str(class_id) + "/"
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
                {"image": images[i], "name": str(idx) + img_names[i]}
            )

    img_path = base_img_path

    for i in range(len(transformed_images)):
        image = transformed_images[i]
        im = Image.fromarray(image["image"])
        img_path = base_img_path + image["name"]
        im.save(img_path)

    return {"done": True}
