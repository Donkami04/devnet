const { RouteDefault } = require("../models/route_default");

class RouteDefaultService {
  async getRouteDefault() {
    try {
      const data = await RouteDefault.findAll();
      return {
        statusCode: 200,
        message: "Información de las Route Default obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información de las Route Default");
    }
  }
}

module.exports = { RouteDefaultService };
