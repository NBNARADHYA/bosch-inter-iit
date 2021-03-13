from typing import Optional
from fastapi import FastAPI, File, UploadFile, Response, Cookie
from fastapi.staticfiles import StaticFiles
import augmentations
from PIL import Image
from io import BytesIO
import numpy as np
import json
import uuid
import folder_actions
import os

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
async def transform_image(response: Response, parameters: str, transformation: int, image: UploadFile = File(...), id: Optional[str] = Cookie(None), step_count: Optional[str] = Cookie(None)):
    if not id:
        id = str(uuid.uuid4())
        print(id)
        response.set_cookie(key="id", value=id)
        folder_actions.mkdir_p("images/" + id)
        step_count = "0"

    if not step_count:
        step_count = "0"
        response.set_cookie(key="step_count", value=step_count)
    else:
        step_count = str(int(step_count) + 1)
        response.set_cookie(key="step_count", value=step_count)

    image1 = load_image_into_numpy_array(await image.read())

    parameters = json.loads(json.loads(parameters), object_hook=hinted_tuple_hook)

    transform = augmentations.augmentations_dict[transformation](**parameters)

    transformed = transform(image=image1)
    transformed_image = transformed["image"]
    
    im = Image.fromarray(transformed_image)
    img_path = "images/" + id + "/transformed_img_" + step_count + ".png"
    im.save(img_path)
    
    return {"img_path": SERVER_BASE_URL + img_path}


@app.post("/reset_images")
async def reset_images(response: Response, id: Optional[str] = Cookie(None)):
    if not id:
        return {"done": False}
    
    response.set_cookie(key="step_count", value=0)
    folder_actions.delete_files("images/" + str(id))

    return {"done": True}


@app.get("/transformed_images")
async def get_transformed_images(id: Optional[str] = Cookie(None)):

    if not id:
        return {"transformed_images": []}

    transformed_images = map(lambda filename: SERVER_BASE_URL + "images/" + id + "/" + filename, folder_actions.get_file_names("images/" + str(id)))

    return {"transformed_images": list(transformed_images)}
