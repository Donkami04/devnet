const RawSQLService = require("../services/dbServices/index");
const { AnilloLorawan } = require("../models/anillo_lorawan");

async function checkStatusActility() {
  console.log("🔍 Iniciando verificación de estado de sensores Actility...");

  const sensores = await RawSQLService.selectDevelopment(
    "SELECT * FROM sensors_actility"
  );

  const ahora = new Date();
  let contadorDown = 0;

  for (const sensor of sensores) {
    if (!sensor?.data) continue;

    let dataSensor;
    try {
      dataSensor = JSON.parse(sensor.data);
    } catch (err) {
      console.error("❌ Error parseando JSON del sensor:", err);
      continue;
    }

    const time = dataSensor?.DevEUI_uplink?.Time;
    if (!time) continue;

    const fechaSensor = new Date(time);
    const diferenciaHoras = (ahora - fechaSensor) / (1000 * 60 * 60);

    if (diferenciaHoras >= 12) {
      contadorDown++;
    }
  }

  const totalSensores = sensores.length;
  const mitad = totalSensores / 2;

  const nuevoStatus = contadorDown >= mitad ? "Down" : "Up";

  await AnilloLorawan.update(
    { status: nuevoStatus },
    { where: { device: "Actility" } }
  );

  console.log(
    `Estado de Actility: ✔ Status actualizado a '${nuevoStatus}' (Down: ${contadorDown}/${totalSensores})`
  );

  console.log("✅ Verificación de estado de sensores Actility completada.");
  return sensores;
}


module.exports = { checkStatusActility };
