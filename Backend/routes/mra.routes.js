const express = require("express");
const router = express.Router();
const { MraService } = require("../controllers/mra");

const Mra = new MraService();

router.get("/", async (req, res, next) => {
  try {
    const response = await Mra.getDataMra();
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
    const response = await Mra.getDataMraUpDown();
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
