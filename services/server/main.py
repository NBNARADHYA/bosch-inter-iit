from typing import Optional
from fastapi import FastAPI, File, UploadFile
import augmentations
from PIL import Image
from io import BytesIO
import numpy as np
import json

app = FastAPI()

def load_image_into_numpy_array(data):
    return np.array(Image.open(BytesIO(data)))

def hinted_tuple_hook(obj):
    if '__tuple__' in obj:
        return tuple(obj['items'])
    else:
        return obj

@app.post("/transform_image")
async def transform_image( parameters: str, transformation: int, image: UploadFile = File(...)):
    image1 = load_image_into_numpy_array(await image.read())

    parameters = json.loads(json.loads(parameters), object_hook=hinted_tuple_hook)

    transform = augmentations.augmentations_dict[transformation](**parameters)

    transformed = transform(image=image1)
    transformed_image = transformed["image"]
    
    im = Image.fromarray(transformed_image)
    im.save('test.png')
    
    return {"hi": "hello"}
