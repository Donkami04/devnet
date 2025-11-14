const { StatusCores } = require("../models/status_cores");

async function getStatusCores() {
    try {
        const data = await StatusCores.findAll();
        return data;
    } catch(error) {
        return error.message;
    }
};

class StatusCoreService {
    async getStatusCore() {
      try {
        const data = await StatusCores.findAll();
        return {
          statusCode: 200,
          message: "Información del estado de los SW Core obtenida exitosamente",
          data: data,
        };
      } catch (error) {
        throw new Error("Error al obtener la información del estado de los SW Core");
      }
    }
  }

module.exports = { StatusCoreService };