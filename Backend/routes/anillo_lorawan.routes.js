const express = require("express");
const router = express.Router();
const { AnilloLorawanService } = require("../controllers/anillo_lorawan");

const AnilloLorawan = new AnilloLorawanService();

router.get("/", async (req, res, next) => {
  try {
    const response = await AnilloLorawan.getDataAnilloLorawan();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/updown", async (req, res, next) => {
  try {
    const response = await AnilloLorawan.getDataLorawanUpDown();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/kpi", async (req, res, next) => {
  try {
    const response = await AnilloLorawan.getDataLorawanKpi();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
