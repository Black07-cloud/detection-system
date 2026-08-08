import Detection from "../models/Detection.js";
import { detectAnimals } from "../services/yolo.service.js";

/* =====================================================
   DETECT ANIMAL
===================================================== */

export const detectAnimal = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await detectAnimals(req.file.path);

    const detection = await Detection.create({
      imageName: req.file.filename,
      imagePath: req.file.path,

      detectedAnimals: result.detections.map((item) => ({
        name: item.animal,
        confidence: item.confidence,
      })),

      totalAnimals: result.count,
    });

    return res.status(201).json({
      success: true,
      message: "Detection saved successfully",
      data: detection,
    });

  } catch (error) {
    console.error("Detection Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =====================================================
   GET HISTORY
   GLOBAL SEARCH + FILTER + PAGINATION
===================================================== */

export const getHistory = async (req, res) => {
  try {
    const {
      search = "",
      animal = "",
      page = 1,
      limit = 20,
    } = req.query;

    const conditions = [];

    /* =========================
       GLOBAL SEARCH
    ========================= */

    if (search.trim()) {
      conditions.push({
        "detectedAnimals.name": {
          $regex: search.trim(),
          $options: "i",
        },
      });
    }

    /* =========================
       ANIMAL FILTER
    ========================= */

    if (
      animal.trim() &&
      animal.toLowerCase() !== "all"
    ) {
      conditions.push({
        "detectedAnimals.name": {
          $regex: `^${animal.trim()}$`,
          $options: "i",
        },
      });
    }

    /* =========================
       MONGODB QUERY
    ========================= */

    const query =
      conditions.length > 0
        ? { $and: conditions }
        : {};

    /* =========================
       PAGINATION
    ========================= */

    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const itemsPerPage = Math.min(
      Math.max(Number(limit) || 20, 1),
      100
    );

    const skip =
      (currentPage - 1) * itemsPerPage;

    /* =========================
       FETCH DATA
    ========================= */

    const history = await Detection.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage);

    const total =
      await Detection.countDocuments(query);

    /* =========================
       RESPONSE
    ========================= */

    return res.status(200).json({
      success: true,

      count: history.length,

      total,

      page: currentPage,

      limit: itemsPerPage,

      totalPages: Math.ceil(
        total / itemsPerPage
      ),

      search,

      animal,

      data: history,
    });

  } catch (error) {
    console.error(
      "Get History Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =====================================================
   GET HISTORY BY ID
===================================================== */

export const getHistoryById = async (req, res) => {
  try {
    const detection =
      await Detection.findById(req.params.id);

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Detection not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: detection,
    });

  } catch (error) {
    console.error(
      "Get Detection Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =====================================================
   DELETE HISTORY
===================================================== */

export const deleteHistory = async (req, res) => {
  try {
    const detection =
      await Detection.findByIdAndDelete(
        req.params.id
      );

    if (!detection) {
      return res.status(404).json({
        success: false,
        message: "Detection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detection deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete Detection Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =====================================================
   GET STATISTICS
===================================================== */

export const getStatistics = async (req, res) => {
  try {
    const history = await Detection.find();

    /* =========================
       ANIMAL DISTRIBUTION
    ========================= */

    const animalMap = {};

    history.forEach((item) => {
      item.detectedAnimals?.forEach((animal) => {
        if (!animal.name) return;

        animalMap[animal.name] =
          (animalMap[animal.name] || 0) + 1;
      });
    });

    const distribution =
      Object.keys(animalMap).map((key) => ({
        name: key,
        value: animalMap[key],
      }));


    /* =========================
       DAILY DETECTIONS
    ========================= */

    const dailyMap = {};

    history.forEach((item) => {
      if (!item.createdAt) return;

      const date =
        item.createdAt
          .toISOString()
          .split("T")[0];

      dailyMap[date] =
        (dailyMap[date] || 0) +
        (item.totalAnimals || 0);
    });

    const daily =
      Object.keys(dailyMap)
        .sort()
        .map((date) => ({
          date,
          count: dailyMap[date],
        }));


    /* =========================
       WEEKLY DETECTIONS
    ========================= */

    const weekNames = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const weeklyMap = {};

    history.forEach((item) => {
      if (!item.createdAt) return;

      const day =
        weekNames[
          item.createdAt.getDay()
        ];

      weeklyMap[day] =
        (weeklyMap[day] || 0) +
        (item.totalAnimals || 0);
    });

    const weekly =
      Object.keys(weeklyMap).map((day) => ({
        day,
        count: weeklyMap[day],
      }));


    return res.status(200).json({
      success: true,
      distribution,
      daily,
      weekly,
    });

  } catch (error) {
    console.error(
      "Statistics Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};