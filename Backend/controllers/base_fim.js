const { FimBase, DatesFimBase } = require("../models/base_fim");
const { Op } = require("sequelize");

class FimService {
  async getFim() {
    try {
      const dataFim = await FimBase.findAll();
      const datesResets = await DatesFimBase.findAll();

      const data = {
        fimStatus: dataFim,
        datesResets: datesResets,
      };

      return {
        statusCode: 200,
        message: "Información de las Base FiM obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información de las Base FiM");
    }
  }

  async getDatesDownBetween(sdate, edate) {
    try {
      const datesResets = await DatesFimBase.findAll({
        where: {
          date: {
            [Op.between]: [`${sdate} 00:00:00`, `${edate} 23:59:59`],
          },
          // base_ip,
        },
      });


      const data = {
        datesResets,
      };

      return {
        statusCode: 200,
        message: "Información de las Base FiM obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      console.log(error)
      throw new Error("Error al obtener la información de las Base FiM");
    }
  }
}

module.exports = { FimService };