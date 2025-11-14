const { getApiData } = require("./getData");
const indicatorService = require("../../controllers/metricas");

const fetchDataUG = async () => {
  try {

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const data = await getApiData("anillo-ug/updown");

    const upToday = data.data.upElements.length;
    const downToday = data.data.downElements.length;

    // Guardar indicadores de hoy
    await indicatorService.saveIndicators(today, "ug", {
      up: upToday,
      down: downToday,
    });

    // Obtener indicadores de hoy y ayer
    const todayIndicators = await indicatorService.getIndicators(today, "ug");
    const yesterdayIndicators = await indicatorService.getIndicators(yesterday, "ug");

    // Comparar métricas
    const comparison = indicatorService.compareMetrics(todayIndicators, yesterdayIndicators);

    let upDiff = "";
    let downDiff = "";

    if (comparison.up) {
      upDiff =
        comparison.up.diff > 0
          ? `<span style="color: green;">(+${comparison.up.diff})</span>`
          : comparison.up.diff < 0
          ? `<span style="color: red;">(${comparison.up.diff})</span>`
          : "";
    }

    if (comparison.down) {
      downDiff =
        comparison.down.diff > 0
          ? `<span style="color: red;">(+${comparison.down.diff})</span>`
          : comparison.down.diff < 0
          ? `<span style="color: green;">(${comparison.down.diff})</span>`
          : "";
    }

    const ug = `
      <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
        <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">Redes Mina UG</h2>
        <div style="text-align: center; overflow-x: auto; margin-top: 20px;">
          <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="width: 33%; border: 1px solid #ddd; padding: 3px; text-align: center;">Sistema</th>
                <th style="width: 33%; border: 1px solid #ddd; padding: 3px; text-align: center; background-color: rgb(3, 186, 31); color: white; font-weight: bold">Up</th>
                <th style="width: 33%; border: 1px solid #ddd; padding: 3px; text-align: center; background-color: red; color: white; font-weight: bold">Down</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Anillo UG</td>
                <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${upToday} ${upDiff}</td>
                <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${downToday} ${downDiff}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    return ug;
  } catch (error) {
    console.error("Error fetching Mina UG data:", error);
        return {
      error: true,
      message: error.stack || error.message
    };
  }
};

module.exports = {
  fetchDataUG,
};
