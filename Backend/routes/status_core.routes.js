const express = require("express");
const router = express.Router();
const { StatusCoreService } = require("../controllers/status_cores");

const StatusCore = new StatusCoreService();

// Obtener todos las StatusCore
router.get("/", async (req, res, next) => {
  try {
    const response = await StatusCore.getStatusCore();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
