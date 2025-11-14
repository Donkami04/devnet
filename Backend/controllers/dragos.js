const { Dragos } = require("../models/dragos");

class DragosService {
  async getDataDragos() {
    try {
      const data = await Dragos.findAll();
      return {
        statusCode: 200,
        message: "Información del Dragos  obtenida exitosamente",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Dragos ");
    }
  }

  async getDataDragosUpDown() {
    try {
      const response = await Dragos.findAll();

      const upElements = [];
      const downElements = [];

      response.forEach((item) => {
        const statusRaw = item.status;
        let status;
        if (statusRaw) {
          status = item.status.toLowerCase();
        }
        if (status && status.includes("up")) {
          upElements.push(item);
        } else if (status && status.includes("down")) {
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
        message: "Información del Dragos  obtenida exitosamente Up Down",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Dragos  Up Down");
    }
  }
}

module.exports = { DragosService };
