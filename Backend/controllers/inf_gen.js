const { DataInfGen } = require("../models/data_infra_general");
const { Ap } = require("../models/ap");
const { DataAp } = require("../models/data_ap");
const axios = require("axios");
const https = require("https");
const { extractInfraestructuraData } = require("./dashboards/InfraGeneralKpi.js/kpi");
require("dotenv").config();

class DataInfGenService {
  async getInfGenData() {
    try {
      const data = await DataInfGen.findAll();
      return {
        statusCode: 200,
        message:
          "Información de los Switches de Infraestructura General obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error(
        "Error al obtener la información de los Switches de Infraestructura General"
      );
    }
  }

  getPercentUpDevices = async () => {
    try {
      const data = await extractInfraestructuraData();
      // console.log(data.grupos_prtg);
      const respData = {
        infraestructura_general: [],
        grupos_prtg: []
      };

      data.infraestructura_general.forEach((element) => {
        const upElem = element.upElem.length;
        const downElem = element.downElem.length;
        const total = upElem + downElem;

        let percentUp = total > 0 ? (upElem / total) * 100 : 100;

        // Validar por si acaso
        if (isNaN(percentUp)) {
          percentUp = 100;
        }

        // Redondear a 2 decimales
        percentUp = Number(percentUp.toFixed(2));

        respData.infraestructura_general.push({
          name: element.name_switch,
          percentUp
        });
      });
      


      data.grupos_prtg.data.forEach((element) => {
        const upElem = element.up;
        const downElem = element.down;
        const total = upElem + downElem;

        let percentUp = total > 0 ? (upElem / total) * 100 : 100; // Evita división por 0

        // Validar si es NaN (por seguridad)
        if (isNaN(percentUp)) {
          percentUp = 100;
        }

        // Redondear a 2 decimales
        percentUp = Number(percentUp.toFixed(2));

        respData.grupos_prtg.push({
          name: element.device,
          group: element.group,
          percentUp
        });
      });
      

      return {
        statusCode: 200,
        message: "Calculo del KPI por Equipo de I. General obtenido exitosamente.",
        data: respData
      }

    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: "Error en el Calculo del KPI por Equipo de I. General.",
        data: null
      }
    }

  };


  getPercentUpByCategory = async () => {
    try {
      const infGenData = await this.getPercentUpDevices();
      const items = infGenData.data.infraestructura_general;
      const itemsPrtg = infGenData.data.grupos_prtg;

      const counters = {
        core: { sum: 0, count: 0 },
        dist: { sum: 0, count: 0 },
        vpnSite: { sum: 0, count: 0 },
        seguridad: { sum: 0, count: 0 },
        telefonia: { sum: 0, count: 0 },
        servidoresIsePrime: { sum: 0, count: 0 },
        controladoras: { sum: 0, count: 0 },
        lte: { sum: 0, count: 0 },
        cctv: { sum: 0, count: 0 },
        fwit: { sum: 0, count: 0 },
        fwot: { sum: 0, count: 0 },
      };

      items.forEach((elem) => {
        const name = elem.name.toLowerCase();

        if (name.includes("core")) {
          counters.core.sum += elem.percentUp;
          counters.core.count++;
        }

        if (name.includes("dist")) {
          counters.dist.sum += elem.percentUp;
          counters.dist.count++;
        }

        if (name.includes("fortigate")) {
          counters.vpnSite.sum += elem.percentUp;
          counters.vpnSite.count++;
        }

        if (name.includes("fac")) {
          counters.seguridad.sum += elem.percentUp;
          counters.seguridad.count++;
        }
      });

      itemsPrtg.forEach((elem) => {
        const group = elem.group.toLowerCase();
        if (group.includes("telefonia ip")) {
          counters.telefonia.sum += elem.percentUp;
          counters.telefonia.count++;
        }

        if (group.includes("servidores ise y prime")) {
          counters.servidoresIsePrime.sum += elem.percentUp;
          counters.servidoresIsePrime.count++;
        }

        if (group.includes("controladoras inalambricas")) {
          counters.controladoras.sum += elem.percentUp;
          counters.controladoras.count++;
        }

        if (group.includes("lte")) {
          counters.lte.sum += elem.percentUp;
          counters.lte.count++;
        }

        if (group.includes("cctv")) {
          counters.cctv.sum += elem.percentUp;
          counters.cctv.count++;
        }

        if (group.includes("fw it")) {
          if (typeof elem.percentUp === "number" && !isNaN(elem.percentUp)) {
            counters.fwit.sum += elem.percentUp;
            counters.fwit.count++;
          }
        }

        if (group.includes("fw ot")) {
          counters.fwot.sum += elem.percentUp;
          counters.fwot.count++;
        }
      });

      const format = ({ sum, count }) =>
        count === 0 ? 0 : Number((sum / count).toFixed(2));

      return {
        statusCode: 200,
        message: "Kpi por categorias OK",
        data: {
          core: format(counters.core),
          dist: format(counters.dist),
          vpnSite: format(counters.vpnSite),
          telefonia: format(counters.telefonia),
          servidoresIsePrime: format(counters.servidoresIsePrime),
          controladoras: format(counters.controladoras),
          lte: format(counters.lte),
          cctv: format(counters.cctv),
          fwit: format(counters.fwit),
          fwot: format(counters.fwot),
          seguridad: format(counters.seguridad),
        }


      };
    } catch (error) {
      console.error(error);
      console.error("[DataInfGenService]-[getPercentUpByCategory] Error");
    }
  };


  getPercentUpGeneral = async () => {
    try {
      const {data} = await this.getPercentUpByCategory();
      
      let sum = 0;
      let count = 0;

      for (const value of Object.values(data)) {
        sum += value;
        count++;
      }

      let kpi = count > 0 ? sum / count : 0;
      kpi = Number((sum / count).toFixed(2))
      
      return {
        statusCode: 200,
        message: "Calculo del KPI General de I.G. obtenido exitosamente.",
        data: kpi
      }

    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        message: "Error en el Calculo del KPI de I. General.",
        data: null
      }
    }

  };

}


module.exports = {
  DataInfGenService,
};
