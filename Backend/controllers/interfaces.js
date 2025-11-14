const { Interfaces } = require("../models/interfaces");

class InterfacesService {
  async getInterfaces() {
    try {
      const data = await Interfaces.findAll();
      return {
        statusCode: 200,
        message:
          "Información de las Interfaces PRTG de la Infraestructura General obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error(
        "Error al obtener la información de las Interfaces PRTG de la Infraestructura General"
      );
    }
  }
}

module.exports = { InterfacesService };
