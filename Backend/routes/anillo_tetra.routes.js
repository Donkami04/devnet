const express = require("express");
const router = express.Router();
const { AnilloTetraService } = require("../controllers/anillo_tetra");

const AnilloTetra = new AnilloTetraService();

router.get("/", async (req, res, next) => {
  try {
    const response = await AnilloTetra.getDataAnilloTetra();
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
    const response = await AnilloTetra.getDataAnilloTetraUpDown();
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
