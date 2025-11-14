// utils/sendEmail.js
const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
const { fetchDataDevices } = require("../utils/email/devices");
const { fetchDataDcs } = require("../utils/email/dcs");
const { navbar } = require("../utils/email/title");
const { fetchDataOpenPit } = require("../utils/email/redes_openpit");
const { fetchDataUps } = require("../utils/email/ups");
const { fetchDataCanales } = require("../utils/email/canales");
const { fetchDataWan } = require("../utils/email/wan");
const { fetchDataInfraGen } = require("../utils/email/infra_general");
const { fetchDataDragos } = require("../utils/email/dragos");
const { fetchDataUG } = require("../utils/email/mina_ug");

const resend = new Resend("re_ZDwv46aq_PTxJzvX1NLzdbZpDLyX7zJ1d");

router.post("/send-report", async (req, res) => {
  try {

    const dashDevices = await fetchDataDevices();
    const dashDcs = await fetchDataDcs();
    const title = navbar();
    const openPitData = await fetchDataOpenPit();
    const upsData = await fetchDataUps();
    const dashCanales = await fetchDataCanales();
    const dashWan = await fetchDataWan();
    const dashInfraGen = await fetchDataInfraGen();
    const dashDragos = await fetchDataDragos();
    const dashUG = await fetchDataUG();

    const footer = `
    <div style="width: 600px; margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
        <p style="text-align: center; color: #ddd; font-size: 10px;">Los datos recopilados en este correo fueron tomados el dia de hoy a las 7:00 AM</p>
      </div>
    `;

    // Enviar el correo
    const result = await resend.emails.send({
      from: "Devnet <onboarding@resend.dev>",
      to: "juan.munera@sgtnetworks.com",
      subject: "Reporte Devnet Candelaria",
      html:
        title +
        dashDcs +
        upsData +
        openPitData +
        dashDevices +
        dashCanales +
        dashWan +
        dashInfraGen +
        dashDragos +
        dashUG +
        footer
    });

    console.log("Respuesta de Resend:", result);
    res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});

module.exports = router;
