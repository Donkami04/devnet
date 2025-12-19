const { DataInfGenService } = require("../controllers/inf_gen");
const InfraGeneral = new DataInfGenService();
const { SlaHistorico } = require("../models/sla_historicos");

const saveSLAInfraGeneral = async () => {
  try {
    // 1. Obtener SLA desde el servicio
    const response = await InfraGeneral.getPercentUpGeneral();

    if (!response || response.statusCode !== 200) {
      throw new Error("No se pudo obtener el SLA de Infraestructura General");
    }

    let slaValue = response.data;

    // 2. Validar que el SLA sea numérico
    if (typeof slaValue !== "number" || isNaN(slaValue)) {
      throw new Error(`El valor recibido de SLA no es un número válido: ${slaValue}`);
    }

    // 3. Asegurar máximo dos decimales
    slaValue = Number(slaValue.toFixed(2));

    // 4. Guardar en base de datos
    await SlaHistorico.create({
      system: "Infraestructura General",
      sla: slaValue,
      datetime: new Date(),
    });

    console.log(
      `SLA de Infraestructura General guardado exitosamente (${slaValue}%)`
    );

  } catch (error) {
    console.error(
      "Error al guardar el SLA de Infraestructura General:",
      error.message
    );
  }
};

module.exports = saveSLAInfraGeneral;
