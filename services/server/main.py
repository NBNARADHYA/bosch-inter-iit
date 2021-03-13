from typing import Optional
from fastapi import FastAPI, File, UploadFile, Response, Cookie, Form
from fastapi.staticfiles import StaticFiles
import augmentations
from PIL import Image
from io import BytesIO
import numpy as np
import json
import uuid
import folder_actions
import os
import cv2


SERVER_BASE_URL = os.environ['SERVER_BASE_URL']


app = FastAPI()


app.mount("/images", StaticFiles(directory="images"), name="images")


def load_image_into_numpy_array(data):
    return np.array(Image.open(BytesIO(data)))


def hinted_tuple_hook(obj):
    if '__tuple__' in obj:
        return tuple(obj['items'])
    else:
        return obj


@app.post("/transform_image")
async def transform_image(response: Response, parameters: str = Form(...), transformation: int = Form(...), transformation_step: Optional[int] = Form(None), image: Optional[UploadFile] = File(None), id: Optional[str] = Cookie(None), step_count: Optional[str] = Cookie(None)):
    if id is None:
        id = str(uuid.uuid4())
        print(id)
        response.set_cookie(key="id", value=id)
        folder_actions.mkdir_p("images/" + id)
        step_count = "0"


    if step_count is None:
        step_count = "0"
        response.set_cookie(key="step_count", value=step_count)
    else:
        step_count = str(int(step_count) + 1)
        response.set_cookie(key="step_count", value=step_count)
    

    if image is not None:
        image = load_image_into_numpy_array(await image.read())
    elif transformation_step is not None:
        img_url = "images/" + str(id) + "/transformed_img_" + str(transformation_step) + ".png"
        image = cv2.imread(img_url)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        step_count = str(int(transformation_step) + 1)
        response.set_cookie(key="step_count", value=step_count)

        folder_actions.delete_files(folder="images/" + str(id), split_string="transformed_img_", low=int(transformation_step))
    else:
        return {"error": "image or transformation_step field required"}


    parameters = json.loads(json.loads(parameters), object_hook=hinted_tuple_hook)

    transform = augmentations.augmentations_dict[transformation](**parameters)

    transformed = transform(image=image)
    transformed_image = transformed["image"]
    
    im = Image.fromarray(transformed_image)
    img_path = "images/" + str(id) + "/transformed_img_" + str(step_count) + ".png"
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

    transformed_images = map(lambda filename: SERVER_BASE_URL + "images/" + id + "/" + filename, folder_actions.get_file_names("images/" + str(id)))

    return {"transformed_images": list(transformed_images)}
