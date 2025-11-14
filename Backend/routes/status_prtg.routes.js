const express = require('express');
const axios = require('axios');
const https = require('https');
const indicatorService = require("../controllers/metricas");

const router = express.Router();
require("dotenv").config();

const PRTG_USERNAME = process.env.PRTG_USERNAME;
const PRTG_PASSWORD = process.env.PRTG_PASSWORD;
router.get('/', async (req, res) => {
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
            return res.json({
                prtg_status: false,
                error: "PRTG respondió pero sin datos válidos"
            });
        }

        // Si llega aquí, significa que PRTG está activo
        res.json({ prtg_status: true });

    } catch (error) {
        console.error("Error al consultar PRTG:", error.message);
        res.json({
            prtg_status: false,
            error: "No se pudo conectar con PRTG"
        });
    }
});

router.get('/test', async (req, res) => {
    try {
        const testResult = await indicatorService.duplicateYesterdayIndicators();
        res.json({ message: "Ruta de estado PRTG funcionando correctamente.", testResult });
    } catch (error) {
        console.error("Error en la ruta de estado PRTG:", error.message);
    }
});

module.exports = router;
