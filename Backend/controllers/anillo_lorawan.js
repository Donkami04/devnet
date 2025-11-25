const { AnilloLorawan } = require("../models/anillo_lorawan");

class AnilloLorawanService {
  async getDataAnilloLorawan() {
    try {
      const data = await AnilloLorawan.findAll();
      return {
        statusCode: 200,
        message: "Información del Anillo Lorawan obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información del Anillo Lorawan");
    }
  }

  async getDataLorawanUpDown() {
    try {
      const response = await AnilloLorawan.findAll();

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

      const data = {
        upElements: upElements.length,
        downElements: downElements.length,
      };

      return {
        statusCode: 200,
        message: "Información del Anillo Lorawan obtenida exitosamente Up Down",
        data: data,
      };
    } catch (error) {
        console.error(error);
      throw new Error("Error al obtener la información del Anillo Lorawan Up Down");
    }
  }

  async getDataLorawanKpi() {
    try {
      const response = await AnilloLorawan.findAll();

      let totalImportance = 0;
      let upImportance = 0;
      let downImportance = 0;

      response.forEach((item) => {
        const imp = Number(item.importancia) || 0;
        totalImportance += imp;
        const status = (item.status || "").toLowerCase();
        if (status.includes("up")) {
          upImportance += imp;
        } else if (status.includes("down")) {
          downImportance += imp;
        }
      });

      const upPorcent = totalImportance ? (upImportance / totalImportance) * 100 : 0;
      const downPorcent = totalImportance ? (downImportance / totalImportance) * 100 : 0;

      const data = {
        totalImportancePoints: totalImportance,
        upImportancePoints: upImportance,
        downImportancePoints: downImportance,
        upPorcent: parseFloat(upPorcent.toFixed(1)),
        downPorcent: parseFloat(downPorcent.toFixed(1)),
      };

      return {
        statusCode: 200,
        message: "Kpi Anillo Lorawan calculados exitosamente",
        data: data,
      };
    } catch (error) {
      console.error(error);
      throw new Error(
        "Error al calcular porcentajes por importancia para Anillo Lorawan"
      );
    }
  }
}

module.exports = { AnilloLorawanService };
