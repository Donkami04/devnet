const { Neighbors } = require("../models/neighbors");

async function getNeighbors() {
  const neighbors = await Neighbors.findAll();
  return neighbors;
}

class NeighborsService {
  async getNeighbors() {
    try {
      const data = await Neighbors.findAll();
      return {
        statusCode: 200,
        message: "Información de los Neighbors obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información de los Neighbors");
    }
  }
}

module.exports = { NeighborsService };
