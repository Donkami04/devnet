const { Mesh } = require("../models/mesh");

class MeshService {
  async getMesh() {
    try {
      const data = await Mesh.findAll();
      return {
        statusCode: 200,
        message: "Información de la MESH obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información de la MESH");
    }
  }
}

module.exports = { MeshService };
