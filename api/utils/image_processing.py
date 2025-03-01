from PIL import Image
import numpy as np
from io import BytesIO


def convert_to_pil_image(image_bytes):
    return Image.open(BytesIO(image_bytes))

def preprocess_image(image_file, target_size):
    image = Image.open(BytesIO(image_file))
    image = image.resize(target_size)
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image