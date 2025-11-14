const { SystemHealth } = require("../models/system_health");

class SystemHealthService {
  async getSystemHealth() {
    try {
      const data = await SystemHealth.findAll();
      return {
        statusCode: 200,
        message:
          "Información de las SystemHealth de Infraestructura General obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error(
        "Error al obtener la información de las SystemHealth de Infraestructura General"
      );
    }
  }
}


module.exports = { SystemHealthService };
