const { Dockers } = require("../models/dockers");

async function getDockersData() {
  const data = await Dockers.findAll();

  let totalCpuPercent = 0;
  let totalMemoryPercent = 0;

  const modifiedData = data.map((docker) => {
    // Convertimos el dato que retorna sequelize a un JSON
    const dockerData = docker.toJSON();

    const memory_usage = parseFloat(
      docker.memory_usage.replace("GB", "").trim()
    );
    const memory_limit = parseFloat(
      docker.memory_limit.replace("GB", "").trim()
    );

    dockerData.cpu_usage_percent = docker.cpu_usage_percent.replace("%", "");
    dockerData.memory_usage_percent = (
      (memory_usage / memory_limit) *
      100
    ).toFixed(2);

    // Esta propiedad se agrega para el posterior procesamiento en el frontend
    dockerData.type = "docker";

    return dockerData;
  });

  // Calculamos total de CPU y memoria
  modifiedData.map((docker) => {
    totalCpuPercent += parseFloat(docker.cpu_usage_percent);
    totalMemoryPercent += parseFloat(docker.memory_usage_percent);
  });

  const total = data.length;
  const runningCount = data.filter(c => c.status === "running").length;
  const percentageRunning = Number(((runningCount / total) * 100).toFixed(2));

  return {
    totalCpuPercent: totalCpuPercent.toFixed(2),
    totalMemoryPercent: totalMemoryPercent.toFixed(2),
    kpi: percentageRunning,
    dataContainers: modifiedData,
  };
}


module.exports = { getDockersData };
