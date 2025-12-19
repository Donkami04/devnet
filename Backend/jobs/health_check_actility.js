const RawSQLService = require("../services/dbServices/index");
const { AnilloLorawan } = require("../models/anillo_lorawan");

async function checkStatusActility() {
  const sensores = await RawSQLService.select(
    "SELECT * FROM actility_sensors"
  );

  const ahora = new Date();

  for (const sensor of sensores) {
    if (!sensor.datetime) continue;

    const fechaSensor = new Date(sensor.datetime);
    const diferenciaHoras = (ahora - fechaSensor) / 1000 / 60 / 60;

    if (diferenciaHoras >= 12) {

      await AnilloLorawan.update(
        { status: "Down" },
        {
          where: { device: "Actility" }
        }
      );

      console.log("✔ Status actualizado a 'Down' para device = Actility");
    }
  }

  return sensores;
}

module.exports = { checkStatusActility };
