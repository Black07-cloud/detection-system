from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import shutil
import os

app = FastAPI(title="Animal Detection API")

# Load model
model = YOLO("train.pt")   # or best.pt

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def home():
    return {
        "success": True,
        "message": "Animal Detection API Running 🚀"
    }


@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    results = model(file_path)

    detections = []

    for result in results:
        for box in result.boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])

            detections.append({
                "animal": model.names[cls],
                "confidence": round(conf, 2)
            })

    return {
        "success": True,
        "count": len(detections),
        "detections": detections
    }