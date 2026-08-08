from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import shutil
import os
import uvicorn
import uuid

# =====================================================
# APP
# =====================================================

app = FastAPI(
    title="WildGuard AI - Animal Detection API",
    version="1.0.0"
)


# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# YOLO MODEL
# =====================================================

MODEL_PATH = "train.pt"

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"YOLO model not found: {MODEL_PATH}"
    )

model = YOLO(MODEL_PATH)


# =====================================================
# UPLOAD DIRECTORY
# =====================================================

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


# =====================================================
# HOME
# =====================================================

@app.get("/")
def home():

    return {
        "success": True,
        "message": "WildGuard AI Animal Detection API Running 🚀"
    }


# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/health")
def health():

    return {
        "success": True,
        "status": "online"
    }


# =====================================================
# DETECT ANIMAL
# =====================================================

@app.post("/detect")
async def detect(
    file: UploadFile = File(...)
):

    try:

        # -------------------------------------------------
        # VALIDATE FILE
        # -------------------------------------------------

        if not file.filename:
            return {
                "success": False,
                "message": "No file selected"
            }

        allowed_extensions = {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        }

        extension = os.path.splitext(
            file.filename
        )[1].lower()

        if extension not in allowed_extensions:

            return {
                "success": False,
                "message": "Only JPG, JPEG, PNG and WEBP images are allowed"
            }


        # -------------------------------------------------
        # UNIQUE FILE NAME
        # -------------------------------------------------

        filename = (
            str(uuid.uuid4())
            + extension
        )

        file_path = os.path.join(
            UPLOAD_DIR,
            filename
        )


        # -------------------------------------------------
        # SAVE IMAGE
        # -------------------------------------------------

        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )


        # -------------------------------------------------
        # YOLO DETECTION
        # -------------------------------------------------

        results = model(
            file_path
        )


        detections = []


        # -------------------------------------------------
        # PROCESS DETECTIONS
        # -------------------------------------------------

        for result in results:

            for box in result.boxes:

                cls = int(
                    box.cls[0]
                )

                conf = float(
                    box.conf[0]
                )

                detections.append({

                    "animal": model.names[cls],

                    "confidence": round(
                        conf,
                        2
                    )

                })


        # -------------------------------------------------
        # RESPONSE
        # -------------------------------------------------

        return {

            "success": True,

            "message": "Animal detection completed",

            "count": len(
                detections
            ),

            "detections": detections,

            "imageName": filename,

            "imagePath": file_path

        }


    except Exception as error:

        print(
            "Detection Error:",
            error
        )

        return {

            "success": False,

            "message": str(error)

        }


# =====================================================
# RUN SERVER
# =====================================================

if __name__ == "__main__":

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )