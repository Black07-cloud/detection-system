import express from "express";
import upload from "../middleware/upload.js";
import {
  detectAnimal,
  getHistory,
  getHistoryById,
  deleteHistory,
  getStatistics,
} from "../controller/detection.controller.js";

const router = express.Router();

router.post("/detect", upload.single("image"), detectAnimal);

router.get("/history", getHistory);

router.get("/history/:id", getHistoryById);

router.delete("/history/:id", deleteHistory);

router.get("/statistics", getStatistics);

export default router;
