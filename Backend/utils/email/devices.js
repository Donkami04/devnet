const { getApiData } = require("./getData");
const indicatorService = require("../../controllers/metricas");

const fetchDataDevices = async () => {
  try {

    // Guardar los indicadores de hoy
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const data = await getApiData("indicators/devices");
    const d = data.data;

    // Guardar indicadores de hoy en BD
    await indicatorService.saveIndicators(today, "devices", d);

    // Obtener datos de hoy y ayer
    const todayIndicators = await indicatorService.getIndicators(today, "devices");
    const yesterdayIndicators = await indicatorService.getIndicators(yesterday, "devices");

    // Comparar ambos días
    const comparison = indicatorService.compareMetrics(todayIndicators, yesterdayIndicators);

    // Crear tabla
    const rows = [
      { name: "Camaras", upKey: "numCamerasUp", downKey: "numCamerasDown", total: d.numTotalCameras },
      { name: "Access Points", upKey: "numApUp", downKey: "numApDown", total: d.numTotalAp },
      { name: "Impresoras", upKey: "numImpresorasUp", downKey: "numImpresorasDown", total: d.numTotalImpresoras },
      { name: "Magic Info", upKey: "numMagicUp", downKey: "numMagicDown", total: d.numTotalMagic },
      { name: "Ctrl de Acceso", upKey: "numBarreraUp", downKey: "numBarreraDown", total: d.numTotalBarrera },
      { name: "Otros", upKey: "numOthersUp", downKey: "numOthersDown", total: d.numTotalOthers },
    ];

    const totalUp = rows.reduce((sum, r) => sum + (comparison[r.upKey]?.today || 0), 0);
    const totalDown = rows.reduce((sum, r) => sum + (comparison[r.downKey]?.today || 0), 0);
    const totalDevices = d.numTotalDevices;

    const dashDevices = `
      <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
        <h2 style="text-align: center; color: #111;">Dispositivos Candelaria</h2>
        <div style="overflow-x: auto; text-align: center;">
          <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="width: 25%; border: 1px solid #ddd; padding: 3px; text-align: center;">Dispositivos</th>
                <th style="width: 25%; border: 1px solid #ddd; padding: 3px; text-align: center; background-color: rgb(3, 186, 31); color: white; font-weight: bold">Up</th>
                <th style="width: 25%; border: 1px solid #ddd; padding: 3px; text-align: center; background-color: red; color: white; font-weight: bold">Down</th>
                <th style="width: 25%; border: 1px solid #ddd; padding: 3px; text-align: center; font-weight: bold">Total</th>
              </tr>
            </thead>
            <tbody>
              ${rows
                .map((row) => {
                  const up = comparison[row.upKey];
                  const down = comparison[row.downKey];

                  const upDiff =
                    up?.diff > 0
                      ? `<span style="color: green;">(+${up.diff})</span>`
                      : up?.diff < 0
                      ? `<span style="color: red;">(${up.diff})</span>`
                      : "";

                  const downDiff =
                    down?.diff > 0
                      ? `<span style="color: red;">(+${down.diff})</span>`
                      : down?.diff < 0
                      ? `<span style="color: green;">(${down.diff})</span>`
                      : "";

                  return `
                    <tr>
                      <td style="border: 1px solid #ddd; padding: 2px; text-align: center;">${row.name}</td>
                      <td style="border: 1px solid #ddd; padding: 2px; text-align: center;">${up?.today || 0} ${upDiff}</td>
                      <td style="border: 1px solid #ddd; padding: 2px; text-align: center;">${down?.today || 0} ${downDiff}</td>
                      <td style="border: 1px solid #ddd; padding: 2px; text-align: center;">${row.total}</td>
                    </tr>`;
                })
                .join("")}
              <tr>
                <td style="border: 1px solid #ddd; padding: 2px; text-align: center; font-weight: bold;">Total</td>
                <td style="border: 1px solid #ddd; padding: 2px; text-align: center; font-weight: bold;">${totalUp}</td>
                <td style="border: 1px solid #ddd; padding: 2px; text-align: center; font-weight: bold;">${totalDown}</td>
                <td style="border: 1px solid #ddd; padding: 2px; text-align: center; font-weight: bold;">${totalDevices}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    return dashDevices;
  } catch (error) {
    console.error("Error fetching device data:", error);
    throw new Error("Failed to fetch device data");
  }
};

module.exports = {
  fetchDataDevices,
};