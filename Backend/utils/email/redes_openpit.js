const { getApiData } = require("./getData");
const IndicatorService = require("../../controllers/metricas");

const fetchDataOpenPit = async () => {
  try {
    const fechaHoy = new Date().toLocaleDateString("sv-SE");
    const fechaAyer = new Date(Date.now() - 86400000).toLocaleDateString("sv-SE");

    // Obtener datos desde la API
    const meshData = await getApiData("indicators/mesh");
    const fimData = await getApiData("fim");
    const anilloData = await getApiData("anillo-opit");
    const meshProcessData = await getApiData("mesh-process");
    const tetraData = await getApiData("anillo-tetra");

    // Procesar Mesh
    const meshUp = meshData.palasOk;
    const meshDown = meshData.palasFailed;

    // Procesar FIM
    const fimStatusList = fimData.data.fimStatus;
    const fimDown = fimStatusList.filter((item) =>
      item.status_http.toLowerCase().includes("down")
    ).length;
    const fimUp = fimStatusList.length - fimDown;

    // Procesar Anillo
    const anilloDown = anilloData.data.filter((item) =>
      item.status.toLowerCase().includes("down")
    ).length;
    const anilloUp = anilloData.data.filter((item) =>
      item.status.toLowerCase().includes("up")
    ).length;

    // Procesar Mesh Process
    const meshProcessDown = meshProcessData.data.filter(
      (item) => item.status === "fail"
    ).length;
    const meshProcessUp = meshProcessData.data.filter(
      (item) => item.status === "ok"
    ).length;

    // Procesar Tetra
    const tetraDown = tetraData.data.filter((item) =>
      item.status.toLowerCase().includes("down")
    ).length;
    const tetraUp = tetraData.data.filter((item) =>
      item.status.toLowerCase().includes("up")
    ).length;

    // Métricas a guardar
    const indicadoresOpenPit = {
      meshUp,
      meshDown,
      fimUp,
      fimDown,
      anilloUp,
      anilloDown,
      meshProcessUp,
      meshProcessDown,
      tetraUp,
      tetraDown,
    };

    // Guardar los datos de hoy
    await IndicatorService.saveIndicators(fechaHoy, "OpenPit", indicadoresOpenPit);

    // Obtener los de ayer
    const indicadoresAyer = await IndicatorService.getIndicators(fechaAyer, "OpenPit");

    // Comparar métricas
    const comparacion = IndicatorService.compareMetrics(indicadoresOpenPit, indicadoresAyer);

    // Generar tabla HTML con tendencias
    const openPitTable = `
    <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="text-align: center; color: #111; font-size: 24px; margin: 0;">Redes Open Pit</h2>
      <div style="text-align: center; overflow-x: auto; margin-top: 20px;">
        <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed; text-align: center;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 40%; border: 1px solid #ddd; padding: 4px;">Sistema</th>
              <th style="width: 30%; border: 1px solid #ddd; padding: 4px; background-color: rgb(3, 186, 31); color: white; font-weight: bold;">Up</th>
              <th style="width: 30%; border: 1px solid #ddd; padding: 4px; background-color: red; color: white; font-weight: bold;">Down</th>
            </tr>
          </thead>
          <tbody>
            ${[
              { nombre: "Mesh", up: "meshUp", down: "meshDown" },
              { nombre: "Radwin", up: "fimUp", down: "fimDown" },
              { nombre: "Anillo", up: "anilloUp", down: "anilloDown" },
              { nombre: "Clientes Open Pit", up: "meshProcessUp", down: "meshProcessDown" },
              { nombre: "Red Tetra", up: "tetraUp", down: "tetraDown" },
            ]
              .map(
                ({ nombre, up, down }) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 4px;">${nombre}</td>
                  <td style="border: 1px solid #ddd; padding: 4px;">
                    ${indicadoresOpenPit[up]} 
                    ${
                      comparacion[up]?.trend === "up"
                        ? `<span style="color: green;">(+${comparacion[up].diff})</span>`
                        : comparacion[up]?.trend === "down"
                        ? `<span style="color: red;">(${comparacion[up].diff})</span>`
                        : ""
                    }
                  </td>
                  <td style="border: 1px solid #ddd; padding: 4px;">
                    ${indicadoresOpenPit[down]} 
                    ${
                      comparacion[down]?.trend === "up"
                        ? `<span style="color: red;">(+${comparacion[down].diff})</span>`
                        : comparacion[down]?.trend === "down"
                        ? `<span style="color: green;">(${comparacion[down].diff})</span>`
                        : ""
                    }
                  </td>
                </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
    `;

    return openPitTable;
  } catch (error) {
    console.error("Error fetching Open Pit data:", error);
        return {
      error: true,
      message: error.stack || error.message
    };
  }
};

module.exports = {
  fetchDataOpenPit,
};
