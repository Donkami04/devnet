const { AnilloUg } = require("../models/anillo_ug");

class AnilloUgService {
  async getDataAnilloUg() {
    try {
      const data = await AnilloUg.findAll();
      return {
        statusCode: 200,
        message: "Información del Anillo UG obtenida exitosamente",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Anillo UG");
    }
  }

  async getDataAnilloUgUpDown() {
    try {
      const response = await AnilloUg.findAll();

      const upElements = [];
      const downElements = [];

      response.forEach((item) => {
        const status = item.status.toLowerCase();
        if (status.includes("up")) {
          upElements.push(item);
        } else if (status.includes("down")) {
          downElements.push(item);
        }
      });

      const totalElements = upElements.length + downElements.length;
      const upPorcent = totalElements
        ? (upElements.length / totalElements) * 100
        : 0;

      const data = {
        upElements,
        downElements,
        upPorcent: parseFloat(upPorcent.toFixed(1)),
      };

      return {
        statusCode: 200,
        message: "Información del Anillo UG obtenida exitosamente Up Down",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Anillo UG Up Down");
    }
  }
}

module.exports = { AnilloUgService };
