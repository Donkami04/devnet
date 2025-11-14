const { getApiData } = require("./getData");

const fetchDataWan = async () => {
  try {
    const data = await getApiData("indicators/wan");

    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const fechaActual = new Date();
    let mesAnteriorIndex = fechaActual.getMonth() - 1;

    if (mesAnteriorIndex < 0) {
      mesAnteriorIndex = 11;
    }

    const mesAnterior = meses[mesAnteriorIndex];

    const wan = `
    <div style="margin-top: 20px; font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="text-align: center; color: #111;">WAN</h2>
        <div style="overflow-x: auto; text-align: center;">
        <table style="width: 100%; max-width: 600px; display: inline-table; border-collapse: collapse; font-size: 10px; color: #333; table-layout: fixed; style="text-align: center;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="width: 50%; border: 1px solid #ddd; padding: 3px; text-align: center;">KPI ${mesAnterior}</th>
              <th style="width: 50%; border: 1px solid #ddd; padding: 3px; text-align: center;">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Sitios remotos</td>	
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${data.kpiWan.kpiOtherWans}</td>
            </tr>
            <tr>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">Candelaria</td>
              <td style="text-align: center; border: 1px solid #ddd; padding: 4px;">${data.kpiWan.kpiAdminWans}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    `;

    return wan;
  } catch (error) {
    console.error("Error fetching Wan data:", error);
    return {
      error: true,
      message: error.stack || error.message
    };
  }
};

module.exports = {
  fetchDataWan,
};
