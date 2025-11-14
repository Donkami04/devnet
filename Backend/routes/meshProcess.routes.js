const express = require("express");
const router = express.Router();
const { MeshClientsService } = require("../controllers/mesh_process");

const Ups = new MeshClientsService();

// Obtener todos las Ups
router.get("/", async (req, res, next) => {
  try {
    const response = await Ups.getMeshClients();
    res.status(response.statusCode).json({
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
