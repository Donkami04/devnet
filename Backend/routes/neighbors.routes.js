const express = require("express");
const router = express.Router();
const { NeighborsService } = require("../controllers/neighbors");

const Neighbors = new NeighborsService();

// Obtener todos las Neighbors
router.get("/", async (req, res, next) => {
  try {
    const response = await Neighbors.getNeighbors();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
