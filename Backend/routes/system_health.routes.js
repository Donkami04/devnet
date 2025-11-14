const express = require("express");
const router = express.Router();
const { SystemHealthService } = require("../controllers/system_health");

const SystemHealth = new SystemHealthService();

// Obtener todos las SystemHealth
router.get("/", async (req, res, next) => {
  try {
    const response = await SystemHealth.getSystemHealth();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
