const express = require("express");
const router = express.Router();
const { DragosService } = require("../controllers/dragos");

const Dragos = new DragosService();

router.get("/", async (req, res, next) => {
  try {
    const response = await Dragos.getDataDragos();
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
    const response = await Dragos.getDataDragosUpDown();
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
