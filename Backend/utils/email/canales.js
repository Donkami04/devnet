const { getApiData } = require("./getData");
const indicatorService = require("../../controllers/metricas");

const fetchDataCanales = async () => {
  try {

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const data = await getApiData("indicators/firewalls");

    // Guardar indicadores de hoy
    await indicatorService.saveIndicators(today, "canales", data);

    // Obtener indicadores de hoy y ayer
    const todayIndicators = await indicatorService.getIndicators(today, "canales");
    const yesterdayIndicators = await indicatorService.getIndicators(yesterday, "canales");

    // Comparar métricas
    const comparison = indicatorService.compareMetrics(todayIndicators, yesterdayIndicators);
    const totalAlive = data.numFwCorpAlive + data.numFwCommuniAlive;
    const totalDown = data.numFwCorpDown + data.numFwCommuniDown;

    const rows = [
      { name: "Corporativos", upKey: "numFwCorpAlive", downKey: "numFwCorpDown" },
      { name: "Comunitarios", upKey: "numFwCommuniAlive", downKey: "numFwCommuniDown" },
      { name: "Total", upKey: "totalAlive", downKey: "totalDown" },
    ];

    const canales = `
      <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
        <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">Canales Internet</h2>
        <div style="text-align: center; overflow-x: auto; margin-top: 20px;">
          <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="width: 40%; border: 1px solid #ddd; padding: 3px; text-align: center;">Canal</th>
                <th style="width: 30%; border: 1px solid #ddd; padding: 3px; text-align: center; background-color: rgb(3, 186, 31); color: white; font-weight: bold">Up</th>
                <th style="width: 30%; border: 1px solid #ddd; padding: 3px; text-align: center; background-color: red; color: white; font-weight: bold">Down</th>
              </tr>
            </thead>
            <tbody>
              ${rows
        .map((row) => {
          let upToday = 0;
          let downToday = 0;
          let upDiff = "";
          let downDiff = "";

          if (row.name === "Total") {
            upToday = totalAlive;
            downToday = totalDown;
          } else {
            const up = comparison[row.upKey];
            const down = comparison[row.downKey];

            upToday = up?.today || 0;
            downToday = down?.today || 0;

            if (up) {
              upDiff =
                up.diff > 0
                  ? `<span style="color: green;">+${up.diff}</span>`
                  : up.diff < 0
                    ? `<span style="color: red;">${up.diff}</span>`
                    : "";
            }

            if (down) {
              downDiff =
                down.diff > 0
                  ? `<span style="color: red;">+${down.diff}</span>`
                  : down.diff < 0
                    ? `<span style="color: green;">${down.diff}</span>`
                    : "";
            }
          }

          return `
                    <tr>
                      <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${row.name}</td>
                      <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${upToday} ${upDiff}</td>
                      <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${downToday} ${downDiff}</td>
                    </tr>`;
        })
        .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    return canales;
  } catch (error) {
    console.error("Error fetching Canales data:", error);
    return {
      error: true,
      message: error.stack || error.message
    };
  }
};

module.exports = {
  fetchDataCanales,
};

