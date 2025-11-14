const { StatusCores } = require("../models/status_cores");
const axios = require('axios');
const https = require('https');

const getStatusPrtg = async () => {
  try {
    const prtgUrl = "https://10.224.241.25/api/table.json?content=devices&name&filter_host=10.224.4.138";
    const params = {
      username: PRTG_USERNAME,
      password: PRTG_PASSWORD
    };

    // Petición al API de PRTG
    const response = await axios.get(prtgUrl, {
      params,
      timeout: 5000, // tiempo máximo de espera
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });

    const data = response.data;

    // ⚠️ Validamos si la respuesta trae algún campo clave de estado
    if (!data || typeof data !== 'object' || response.status !== 200) {
      return {
        prtg_status: false,
        error: "PRTG respondió pero sin datos válidos"
      }
    }

    // Si llega aquí, significa que PRTG está activo
    return { prtg_status: true };

  } catch (error) {
    console.error("Error al consultar PRTG:", error.message);
    return {
        prtg_status: false,
        error: "Error Devnet"
      };
  }
}


module.exports = { getStatusPrtg };