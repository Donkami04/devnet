const express = require("express");
const router = express.Router();
const { RouteDefaultService } = require("../controllers/route_default");

const RouteDefault = new RouteDefaultService();

// Obtener todos las RouteDefault
router.get("/", async (req, res, next) => {
  try {
    const response = await RouteDefault.getRouteDefault();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
