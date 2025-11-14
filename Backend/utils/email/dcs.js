const { getApiData } = require("./getData");
const IndicatorService = require("../../controllers/metricas");
const fetchDataDcs = async () => {
  try {
    const fechaHoy = new Date().toLocaleDateString("sv-SE");
    const fechaAyer = new Date(Date.now() - 86400000).toLocaleDateString("sv-SE");

    // Obtener datos de la API
    const dataCandelaria = await getApiData("indicators/dcs-candelaria");
    const dataDesaladora = await getApiData("indicators/dcs-desaladora");
    const dataMra = await getApiData("mra/updown");
    const flotacion = await getApiData("flotacion-ot/updown");

    // Preparar métricas a guardar
    const indicadoresCandelaria = {
      overall: dataCandelaria.overallKpi.indicador,
      disp: dataCandelaria.disponibilidad.indicador,
      infraSol: dataCandelaria.infraSolucion.indicador,
    };

    const indicadoresDesaladora = {
      overall: dataDesaladora.overallKpi.indicador,
      disp: dataDesaladora.disponibilidad.indicador,
    };

    const indicadoresMra = {
      up: dataMra.data.upElements.length,
      down: dataMra.data.downElements.length,
    }

    const indicadoresFlotacion = {
      up: flotacion.data.upElements.length,
      down: flotacion.data.downElements.length,
    }

    // Guardar en la BD
    await IndicatorService.saveIndicators(fechaHoy, "DCS Candelaria", indicadoresCandelaria);
    await IndicatorService.saveIndicators(fechaHoy, "DCS Desaladora", indicadoresDesaladora);
    await IndicatorService.saveIndicators(fechaHoy, "DCS MRA", indicadoresMra);
    await IndicatorService.saveIndicators(fechaHoy, "Red OT Flotación", indicadoresFlotacion);
    
    // Traer los de ayer
    const ayerCandelaria = await IndicatorService.getIndicators(fechaAyer, "DCS Candelaria");
    const ayerDesaladora = await IndicatorService.getIndicators(fechaAyer, "DCS Desaladora");
    const ayerMra = await IndicatorService.getIndicators(fechaAyer, "DCS MRA");
    const ayerFlotacion = await IndicatorService.getIndicators(fechaAyer, "Red OT Flotación");
    console.log("Comparacion ayerFlotacion:", ayerFlotacion);

    // Comparar métricas
    const comparacionCandelaria = IndicatorService.compareMetrics(indicadoresCandelaria, ayerCandelaria);
    const comparacionDesaladora = IndicatorService.compareMetrics(indicadoresDesaladora, ayerDesaladora);
    const comparacionFlotacion = IndicatorService.compareMetrics(indicadoresFlotacion, ayerFlotacion);
    const comparacionMra = IndicatorService.compareMetrics(indicadoresMra, ayerMra);

    const dcsTable = `
    <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">Control Proceso</h2>
      <h3 style="text-align: center; color: #111; margin-top: 4px;">DCS</h3>
      <div style="text-align: center; overflow-x: auto;">
        <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 25%; border: 1px solid #ddd; padding: 4px;">Ubicación</th>
              <th style="width: 25%; border: 1px solid #ddd; padding: 4px;">Overall</th>
              <th style="width: 25%; border: 1px solid #ddd; padding: 4px;">Disp</th>
              <th style="width: 25%; border: 1px solid #ddd; padding: 4px;">Inf Sol</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Candelaria</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresCandelaria.overall}% ${comparacionCandelaria.overall.trend === "up" ? `<span style='color: green;'>(+${Number(comparacionCandelaria?.overall?.diff).toFixed(2)}%)</span>` : comparacionCandelaria.overall.trend === "down" ? `<span style='color: red;'>(${Number(comparacionCandelaria?.overall?.diff).toFixed(2)}%)</span>` : ""}
              </td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresCandelaria.disp}% ${comparacionCandelaria.disp.trend === "up" ? `<span style='color: green;'>(+${Number(comparacionCandelaria?.disp?.diff).toFixed(2)}%)</span>` : comparacionCandelaria.disp.trend === "down" ? `<span style='color: red;'>(${Number(comparacionCandelaria?.disp?.diff).toFixed(2)}%)</span>` : ""}
              </td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresCandelaria.infraSol}% ${comparacionCandelaria.infraSol.trend === "up" ? `<span style='color: green;'>(+${Number(comparacionCandelaria?.infraSol?.diff).toFixed(2)}%)</span>` : comparacionCandelaria.infraSol.trend === "down" ? `<span style='color: red;'>(${Number(comparacionCandelaria?.infraSol?.diff).toFixed(2)}%)</span>` : ""}
              </td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Desaladora</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresDesaladora.overall}% ${comparacionDesaladora.overall.trend === "up" ? `<span style='color: green;'>(+${Number(comparacionDesaladora?.overall?.diff).toFixed(2)}%)</span>` : comparacionDesaladora.overall.trend === "down" ? `<span style='color: red;'>(${Number(comparacionDesaladora?.overall?.diff).toFixed(2)}%)</span>` : ""}
              </td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">
                ${indicadoresDesaladora.disp}% ${comparacionDesaladora.disp.trend === "up" ? `<span style='color: green;'>(+${Number(comparacionDesaladora?.disp?.diff).toFixed(2)}%)</span>` : comparacionDesaladora.disp.trend === "down" ? `<span style='color: red;'>(${Number(comparacionDesaladora?.disp?.diff).toFixed(2)}%)</span>` : ""}
              </td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;

    const otTable = `
      <h3 style="text-align: center; color: #111; margin-top: 24px;">Sistemas OT</h3>
      <div style="text-align: center; overflow-x: auto;">
        <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed; style="text-align: center;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 33%; border: 1px solid #ddd; padding: 4px;">Sistema</th>
              <th style="width: 17%; border: 1px solid #ddd; padding: 4px; background-color: rgb(3, 186, 31); color: white; font-weight: bold">Up</th>
              <th style="width: 17%; border: 1px solid #ddd; padding: 4px; background-color: red; color: white; font-weight: bold">Down</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">Red OT Flotación</td>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${indicadoresFlotacion.up} ${comparacionFlotacion?.up.trend === "up" ? `<span style='color: green;'>(+${comparacionFlotacion?.up?.diff})</span>` : comparacionFlotacion?.up.trend === "down" ? `<span style='color: red;'>(${comparacionFlotacion?.up.diff})</span>` : ""}</td>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${indicadoresFlotacion.down} ${comparacionFlotacion?.down.trend === "up" ? `<span style='color: green;'>(+${comparacionFlotacion?.down?.diff})</span>` : comparacionFlotacion?.down.trend === "down" ? `<span style='color: red;'>(${comparacionFlotacion?.down.diff})</span>` : ""}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">MRA</td>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${indicadoresMra.up} ${comparacionMra?.up.trend === "up" ? `<span style='color: green;'>(+${comparacionMra?.up.diff})</span>` : comparacionMra?.up.trend === "down" ? `<span style='color: red;'>(${comparacionMra?.up.diff})</span>` : ""}</td>
              <td style="border: 1px solid #ddd; padding: 4px; text-align: center;">${indicadoresMra.down} ${comparacionMra?.down.trend === "up" ? `<span style='color: green;'>(+${comparacionMra?.down.diff})</span>` : comparacionMra?.down.trend === "down" ? `<span style='color: red;'>(${comparacionMra?.down.diff})</span>` : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;


    return dcsTable + otTable;
  } catch (error) {
    console.error("Error fetching DCS data:", error);
        return {
      error: true,
      message: error.stack || error.message
    };
  }
};

module.exports = {
  fetchDataDcs,
};
