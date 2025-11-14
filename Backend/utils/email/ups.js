const { getApiData } = require("./getData");
const IndicatorService = require("../../controllers/metricas");

const fetchDataUps = async () => {
  try {
    const fechaHoy = new Date().toLocaleDateString("sv-SE");
    const fechaAyer = new Date(Date.now() - 86400000).toLocaleDateString("sv-SE");

    // Obtener datos de la API
    const allUps = await getApiData("ups");

    let enLinea = 0;
    let usandoBateria = 0;
    let otro = 0;
    let changeBateryCounter = 0;

    if (allUps) {
      allUps.data.forEach(({ status_ups, batery }) => {
        switch (status_ups) {
          case 2:
            enLinea++;
            break;
          case 3:
            usandoBateria++;
            break;
          default:
            otro++;
        }

        if (batery === 2) {
          changeBateryCounter++;
        }
      });
    }

    // Guardar métricas de hoy
    const indicadoresUps = {
      enLinea,
      usandoBateria,
      otro,
      changeBateryCounter,
    };
    await IndicatorService.saveIndicators(fechaHoy, "UPS", indicadoresUps);

    // Traer métricas de ayer
    const indicadoresAyer = await IndicatorService.getIndicators(fechaAyer, "UPS");
    // Comparar métricas
    const comparacion = IndicatorService.compareMetrics(indicadoresUps, indicadoresAyer);
    // Generar HTML con tendencia
    const ups = `
    <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">UPS</h2>
      <div style="text-align: center; overflow-x: auto; margin-top: 20px;">
        <table style="width: 100%; max-width: 600px; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed; style="text-align: center;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 50%; border: 1px solid #ddd; padding: 4px;">Estado</th>
              <th style="width: 50%; border: 1px solid #ddd; padding: 4px;">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">En línea</td>	
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${enLinea} ${comparacion?.enLinea.trend === "up" ? `<span style='color: green;'>(+${comparacion?.enLinea.diff})</span>` : comparacion?.enLinea.trend === "down" ? `<span style='color: red;'>(${comparacion?.enLinea.diff})</span>` : ""}</td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Usando batería</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${usandoBateria} ${comparacion?.usandoBateria.trend === "up" ? `<span style='color: red;'>(+${comparacion?.usandoBateria.diff})</span>` : comparacion?.usandoBateria.trend === "down" ? `<span style='color: green;'>(${comparacion?.usandoBateria.diff})</span>` : ""}</td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Otro</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${otro} ${comparacion?.otro.trend === "up" ? `<span style='color: red;'>(+${comparacion?.otro.diff})</span>` : comparacion?.otro.trend === "down" ? `<span style='color: green;'>(${comparacion?.otro.diff})</span>` : ""}</td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Cambio batería</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${changeBateryCounter} ${comparacion?.changeBateryCounter.trend === "up" ? `<span style='color: red;'>(+${comparacion?.changeBateryCounter.diff})</span>` : comparacion?.changeBateryCounter.trend === "down" ? `<span style='color: green;'>(${comparacion?.changeBateryCounter.diff})</span>` : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    `;

    return ups;
  } catch (error) {
    console.error("Error fetching UPS data:", error);
        return {
      error: true,
      message: error.stack || error.message
    };
  }
};

module.exports = {
  fetchDataUps,
};
