const axios = require('axios');
const https = require('https');
require("dotenv").config();

const PRTG_USERNAME = process.env.PRTG_USERNAME;
const PRTG_PASSWORD = process.env.PRTG_PASSWORD;

// Obtener los stats de las maquinas de produccion, desarrollo e historico de devnet
class Devnet {
  async getDataVmDevnet() {
    try {
      const vmData = [
        {
          ip: "10.224.116.14",
          name: "VM DEVNET Produccion",
          prtgId: 20716
        },
        {
          ip: "10.224.116.78",
          name: "VM DEVNET Desarrollo",
          prtgId: 20721
        },
        {
          ip: "10.230.116.17",
          name: "VM DEVNET Historico",
          prtgId: 20724
        }
      ];

      const params = {
        username: PRTG_USERNAME,
        password: PRTG_PASSWORD
      };

      for (const vm of vmData) {
        const prtgUrl = `https://10.224.241.25/api/table.json?content=sensors&id=${vm.prtgId}&columns=sensor,lastvalue,status&username=${PRTG_USERNAME}&password=${PRTG_PASSWORD}`;

        // Petición al API de PRTG
        const response = await axios.get(prtgUrl, {
          params,
          timeout: 5000, // tiempo máximo de espera
          httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        
        const dataSensors = response.data.sensors || [];
        const sensors = dataSensors.map((e) => {
          return {
            sensor: e.sensor,
            status: e.status,
            lastvalue: e.lastvalue
          }
        })

        vm.sensors = sensors;

      }

      return {
        statusCode: 200,
        message: "Datos de las VM de Devnet obetnidas con exito",
        vmData,
      }

    } catch (error) {
      console.error("Error al obtener datos de las VM de Devnet", error.message);
      return {
        statusCode: 200,
        error: error.message,
        sensors: null,
      }
    }
  }
}

module.exports =  new Devnet() ;
