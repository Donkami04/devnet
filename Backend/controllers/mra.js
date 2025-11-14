const { Mra } = require("../models/mra");

class MraService {
  async getDataMra() {
    try {
      const data = await Mra.findAll();
      return {
        statusCode: 200,
        message: "Información del Mra obtenida exitosamente",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Mra ");
    }
  }

  async getDataMraUpDown() {
    try {
      const response = await Mra.findAll();

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
        message: "Información del Mra obtenida exitosamente Up Down",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Mra  Up Down");
    }
  }
}

module.exports = { MraService };
