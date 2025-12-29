const cron = require("node-cron");
const { sendEmailReport } = require("./email_report");
const { checkPrtgAndSaveIfDown  } = require("./prtg_worker")
const {saveSLAInfraGeneral} = require("./save_sla");
const { checkStatusActility } = require("./health_check_actility");

// Ejecutar todos los días a las 7:00 AM
cron.schedule("0 7 * * *", async () => {
// cron.schedule("* * * * *", async () => {
  console.log("Ejecutando cronjob para enviar el reporte a las 7:00 AM...");
  await sendEmailReport();
});

// Ejecutar cada 10 minutos
cron.schedule("*/10 * * * *", async () => {
  console.log("Ejecutando cronjob para verificar PRTG cada 10 minutos...");
  await checkPrtgAndSaveIfDown();
});

// Ejecutar cada 5 minutos para guardar SLA de Infraestructura General
cron.schedule("*/5 * * * *", async () => {
  console.log("Ejecutando cronjob para guardar SLA de Infraestructura General cada 5 minutos...");
  await saveSLAInfraGeneral();
});

// Ejecutar cada 5 minutos para ver el estado de Actility cada 5 minutos
cron.schedule("*/5 * * * *", async () => {
  console.log("Ejecutando cronjob para ver el estado de Actility cada 5 minutos...");
  await checkStatusActility();
});


