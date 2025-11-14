const { AnilloOpit } = require("../models/anillo_opit");

class AnilloOpitService {
  async getDataAnilloOpit() {
    try {
      const data = await AnilloOpit.findAll();
      return {
        statusCode: 200,
        message: "Información del Anillo UG obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información del Anillo UG");
    }
  }
}

module.exports = { AnilloOpitService };
