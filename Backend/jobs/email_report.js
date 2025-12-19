const nodemailer = require("nodemailer");
const { getStatusPrtg } = require("../controllers/status_prtg");
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
const indicatorService = require("../controllers/metricas");
 

const transporter = nodemailer.createTransport({
  host: "10.224.98.53",
  port: 25,
  secure: false,
});

// --- Enviar correo de error solo al admin ---
async function sendErrorEmail(section, errorMsg) {
  try {
    await transporter.sendMail({
      from: "Devnet <devnet@lundinmining.com>",
      to: "juan.munera@sgtnetworks.com",
      subject: `⚠️ Error en módulo "${section}" del Reporte Devnet`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: red;">Error en el proceso de generación del reporte</h2>
          <p>El proceso fue detenido debido a un error en la sección: <strong>${section}</strong></p>
          <h3>Detalle del error:</h3>
          <pre style="background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd; color: #333;">
${errorMsg}
          </pre>
          <p style="margin-top: 20px;">🕒 Fecha y hora del servidor: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });
    await indicatorService.duplicateYesterdayIndicators();
    console.log(`📩 Correo de error enviado a administrador (módulo ${section})`);
  } catch (err) {
    console.error("❌ Error enviando correo de error:", err);
  }
}

// --- Función principal ---
const sendEmailReport = async () => {
  console.log("Iniciando envío de Email...");

  try {
    const checkStatusPrtg = await getStatusPrtg();
    if (!checkStatusPrtg.error) {
      return await sendErrorEmail("Check PRTG Status", checkStatusPrtg.error);
    }

    const title = navbar();

    // Ejecutar cada módulo
    const dashDcs = await fetchDataDcs();
    if (dashDcs.error) return await sendErrorEmail("DCS", dashDcs.message);

    const upsData = await fetchDataUps();
    if (upsData.error) return await sendErrorEmail("UPS", upsData.message);

    const openPitData = await fetchDataOpenPit();
    if (openPitData.error) return await sendErrorEmail("Redes OpenPit", openPitData.message);

    const dashDevices = await fetchDataDevices();
    if (dashDevices.error) return await sendErrorEmail("Dispositivos", dashDevices.message);

    const dashCanales = await fetchDataCanales();
    if (dashCanales.error) return await sendErrorEmail("Canales", dashCanales.message);

    const dashWan = await fetchDataWan();
    if (dashWan.error) return await sendErrorEmail("WAN", dashWan.message);

    const dashInfraGen = await fetchDataInfraGen();
    if (dashInfraGen.error) return await sendErrorEmail("Infraestructura General", dashInfraGen.message);

    const dashDragos = await fetchDataDragos();
    if (dashDragos.error) return await sendErrorEmail("Dragos", dashDragos.message);

    const dashUG = await fetchDataUG();
    if (dashUG.error) return await sendErrorEmail("Mina UG", dashUG.message);

    // Footer
    const footer = `
      <div style="width: 600px; margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
        <p style="text-align: center; color: #888; font-size: 10px;">
          Los datos recopilados en este correo fueron tomados el día de hoy a las 7:00 AM
        </p>
      </div>
    `;

    // Si todo va bien, enviamos el correo normal
    const htmlBody =
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
      footer;

    const result = await transporter.sendMail({
      from: "Devnet <devnet@lundinmining.com>",
      to: [
        "juan.munera@sgtnetworks.com",
        "julio.coral@sgtnetworks.com",
        "adriana.franco@sgtnetworks.com",
        "alan.munoz@lundinmining.com",
        "oscar.palomino@lundinmining.com",
        "luis.alfaro@lundinmining.com",
        "alvaro.pardo@lundinmining.com",
        "esteban.quezada@lundinmining.com",
      ],
      subject: "Reporte Devnet Candelaria",
      html: htmlBody,
    });

    console.log("✅ Correo enviado correctamente:", result);
    return { statusCode: 200, message: "Correo enviado correctamente" };
  } catch (error) {
    console.error("❌ Error general en el proceso:", error);
    await sendErrorEmail("General", error.stack || error.message);
    return { statusCode: 500, message: "Error general en envío" };
  }
};

// sendEmailReport();

module.exports = { sendEmailReport };
