const { useDataInfGen } = require("../../controllers/dashboards/infra_general");
const indicatorService = require("../../controllers/metricas");

const fetchDataInfraGen = async () => {
  try {
    const data = await useDataInfGen();
    const elementsTempUp = data.upElements.filter((element) => element.name && element.name.includes("Temperatures"));
    const elementsTempDown = data.downElements.filter(
      (element) => element.name && element.name.includes("Temperatures")
    );

    const indicators = {
      upElements: data.upElements.length,
      downElements: data.downElements.length,
    }

    const today = new Date().toISOString().split("T")[0]; 
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    // Guardar indicadores de hoy 
    await indicatorService.saveIndicators(today, "infraestructura general", indicators); 
    
    // Obtener indicadores de hoy y ayer 
    const todayIndicators = await indicatorService.getIndicators(today, "infraestructura general"); 
    const yesterdayIndicators = await indicatorService.getIndicators(yesterday, "infraestructura general"); // Comparar métricas 
    const comparison = indicatorService.compareMetrics(todayIndicators, yesterdayIndicators);
    
    const infraGen = `
    <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">Infraestructura General</h2>
      <div style="text-align: center; overflow-x: auto; margin-top: 20px;">
        <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed; style="text-align: center;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 25%; border: 1px solid #ddd; padding: 3px; text-align: center;">Info</th>
              <th style="width: 25%; border: 1px solid #ddd; padding: 3px; text-align: center; background-color: rgb(3, 186, 31); color: white; font-weight: bold">Up</th>
              <th style="width: 25%; border: 1px solid #ddd; padding: 3px; text-align: center; background-color: red; color: white; font-weight: bold">Down</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">General</td>	
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${indicators.upElements} ${comparison?.upElements.trend === "up" ? `<span style='color: green;'>(+${comparison?.upElements.diff})</span>` : comparison?.upElements.trend === "down" ? `<span style='color: red;'>(${comparison?.upElements.diff})</span>` : ""}</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${indicators.downElements} ${comparison?.downElements.trend === "up" ? `<span style='color: red;'>(+${comparison?.downElements.diff})</span>` : comparison?.downElements.trend === "down" ? `<span style='color: green;'>(${comparison?.downElements.diff})</span>` : ""}</td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Temperaturas</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${elementsTempUp.length}</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${elementsTempDown.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    `;

    return infraGen;
  } catch (error) {
    console.error("Error fetching Infra General data:", error);
        return {
      error: true,
      message: error.stack || error.message
    };
  }
};

module.exports = {
  fetchDataInfraGen,
};
