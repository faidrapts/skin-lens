from fastapi import APIRouter, UploadFile, File, HTTPException
from api.models.cnn_model import CNNModel
from api.utils.image_processing import preprocess_image, convert_to_pil_image
import os

router = APIRouter()

# model_path = os.getenv('MODEL_PATH', 'path/to/your/model.h5')
cnn_model = CNNModel()

@router.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type")

    image = await file.read()
    # processed_image = preprocess_image(image, target_size=(224, 224))
    processed_image = convert_to_pil_image(image)
    class_label, confidence_score = cnn_model.predict(processed_image)
    return {"class": int(class_label), "confidence": float(confidence_score)}