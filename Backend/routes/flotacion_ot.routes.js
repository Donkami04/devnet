const express = require("express");
const router = express.Router();
const { FlotacionOtService } = require("../controllers/flotacion_ot");

const FlotacionOt = new FlotacionOtService();

router.get("/", async (req, res, next) => {
  try {
    const response = await FlotacionOt.getDataFlotacionOt();
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
    const response = await FlotacionOt.getDataFlotacionOtUpDown();
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
