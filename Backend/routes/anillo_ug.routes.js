const express = require("express");
const router = express.Router();
const { AnilloUgService } = require("../controllers/anillo_ug");

const AnilloUg = new AnilloUgService();

router.get("/", async (req, res, next) => {
  try {
    const response = await AnilloUg.getDataAnilloUg();
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
    const response = await AnilloUg.getDataAnilloUgUpDown();
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
