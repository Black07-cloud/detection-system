import mongoose from "mongoose";

const detectionSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true,
    },

    imagePath: {
      type: String,
      required: true,
    },

    detectedAnimals: [
      {
        name: {
          type: String,
          required: true,
        },

        confidence: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAnimals: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Detection", detectionSchema);