const express = require("express");
const router = express.Router();
const { InterfacesService } = require("../controllers/interfaces");

const Interfaces = new InterfacesService();

// Obtener todos las Interfaces
router.get("/", async (req, res, next) => {
  try {
    const response = await Interfaces.getInterfaces();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
