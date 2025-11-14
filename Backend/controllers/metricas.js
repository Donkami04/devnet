
const Indicator = require("../models/indicadores_diarios");

class IndicatorService {
  // Guardar indicadores en la base de datos
  async saveIndicators(fecha, sistema, indicadores) {
    const registros = Object.entries(indicadores).map(([metrica, valor]) => ({
      fecha,
      sistema,
      metrica,
      valor,
    }));

    await Indicator.bulkCreate(registros);
  }

  // Obtener indicadores por fecha, sistema y ubicación
  async getIndicators(fecha, sistema) {
    const rows = await Indicator.findAll({
      where: { fecha, sistema },
    });

    return rows.reduce((acc, row) => {
      acc[row.metrica] = parseFloat(row.valor);
      return acc;
    }, {});
  }

  // Comparar métricas de hoy vs ayer
  compareMetrics(today, yesterday) {
    const result = {};
    for (const metric in today) {
      const diff = today[metric] - (yesterday[metric] || 0);
      result[metric] = {
        today: today[metric],
        yesterday: yesterday[metric] || "N/A",
        diff,
        trend: diff > 0 ? "up" : diff < 0 ? "down" : "equal",
      };
    }
    return result;
  }

   // 🔁 Copiar los indicadores del día anterior con fecha de hoy
  async duplicateYesterdayIndicators() {
    const hoy = new Date().toISOString().split("T")[0];
    const ayer = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    // Obtener todos los indicadores del día anterior
    const yesterdayIndicators = await Indicator.findAll({
      where: { fecha: ayer },
    });

    if (!yesterdayIndicators.length) {
      console.log(`No hay indicadores del día ${ayer} para duplicar.`);
      return [];
    }

    // Crear nuevos registros con la fecha de hoy
    const todayIndicators = yesterdayIndicators.map((row) => ({
      fecha: hoy,
      sistema: row.sistema,
      metrica: row.metrica,
      valor: row.valor,
    }));

    // Insertar los nuevos registros
    await Indicator.bulkCreate(todayIndicators);
    console.log(`Se duplicaron ${todayIndicators.length} indicadores del ${ayer} al ${hoy}.`);

    return todayIndicators;
  }
  
}

module.exports = new IndicatorService();

