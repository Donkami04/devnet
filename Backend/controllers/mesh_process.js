const { MeshClients } = require("../models/mesh_process");

class MeshClientsService {
  async getMeshClients() {
    try {
      const data = await MeshClients.findAll();
      return {
        statusCode: 200,
        message: "Información de los Clientes Mesh obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información de los Clientes Mesh");
    }
  }
}

module.exports = { MeshClientsService };
