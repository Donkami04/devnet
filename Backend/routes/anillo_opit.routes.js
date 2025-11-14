const express = require("express");
const router = express.Router();
const { AnilloOpitService } = require("../controllers/anillo_opit");

const AnilloOpit = new AnilloOpitService();

router.get("/", async (req, res, next) => {
  try {
    const response = await AnilloOpit.getDataAnilloOpit();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
