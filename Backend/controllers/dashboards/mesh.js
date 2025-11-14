const { getMesh } = require("../mesh");
const { MeshService } = require("../mesh");

const Mesh = new MeshService();

const dashboardMesh = async () => {
  try {
    const meshList = await Mesh.getMesh();
    const allMeshJSON = meshList.data.map((mesh) => mesh.toJSON());

    let totalPalas = 0;
    const palasStatus2 = [];
    const palasWarnings = [];
    const palasFailed = [];
    
    let totalCaex = 0;
    const caexStatus2 = [];
    const caexWarnings = [];
    const caexFailed = [];

    allMeshJSON.forEach((device) => {
      // Contador para totales
      if (device.device.includes("Pala")) {
        totalPalas++;
      };
      if (device.device.includes("Caex")) {
        totalCaex++;
      };
      // Contador para total de estado 2
      if (device.status_dispatch.includes("2")) {
        if (device.device.includes("Pala")) {palasStatus2.push(device)};
        if (device.device.includes("Caex")) {caexStatus2.push(device)};
      };
      // Contador para total de estado 2 Failed!!
      if (device.status_dispatch.includes("2") &&
        (
          (device.nivel_senal !== 'Not Found' && device.nivel_senal !== 'N/A' && Math.abs(parseInt(device.nivel_senal)) >= 85) ||
          (device.snr !== 'Not Found' && device.snr !== 'N/A' && parseInt(device.snr) <= 10)
          // (device.packet_loss !== 'Not Found' && parseFloat(device.ping_avg.replace('.', '')) >= 500) ||//! Esto elimina el AVPG ping como parametro para estados fails
        )
      ) {
        if (device.device.includes("Pala")) {palasFailed.push(device)};
        if (device.device.includes("Caex")) {caexFailed.push(device)};
      }
      // Contador para total de estado 2 Warning!!
      if (device.status_dispatch.includes("2") &&
        (
          (device.nivel_senal !== 'Not Found' && device.nivel_senal !== 'N/A' &&
            Math.abs(parseInt(device.nivel_senal)) > 80 && Math.abs(parseInt(device.nivel_senal)) < 85) ||
          (device.packet_loss !== 'Not Found' && 
            parseFloat(device.ping_avg.replace('.', '')) > 350 && parseFloat(device.ping_avg.replace('.', '')) < 500) ||
          (device.snr !== 'Not Found' && device.snr !== 'N/A' && 
            parseInt(device.snr) > 10 && parseInt(device.snr) <= 13)
        )
      ) 
      // Si el device pasa los filtros de warning pero ya existe en Failed no pushearemos a palas o caex Warnings!
      {
        if (device.device.includes("Pala") && !palasFailed.some(d => d.device === device.device)) {
          palasWarnings.push(device);
        }
        if (device.device.includes("Caex") && !caexFailed.some(d => d.device === device.device)) {
          caexWarnings.push(device);
        }
      }
    });

    const numPalasStatus2 = palasStatus2.length;
    const numPalasFailed = palasFailed.length;
    const numPalasWarnings = palasWarnings.length;
    const numPalasOk = numPalasStatus2 - numPalasFailed - numPalasWarnings;
    const numCaexStatus2 = caexStatus2.length;
    const numCaexFailed = caexFailed.length;
    const numCaexWarnings = caexWarnings.length;
    const numCaexOk = numCaexStatus2 - numCaexFailed - numCaexWarnings;
    
    const data = {
      totalPalas: totalPalas,
      palasStatus2: numPalasStatus2,
      palasFailed: numPalasFailed,
      palasWarnings: numPalasWarnings,
      palasOk: numPalasOk,
      totalCaex: totalCaex,
      caexStatus2: numCaexStatus2,
      caexFailed: numCaexFailed,
      caexWarnings: numCaexWarnings,
      caexOk: numCaexOk,
    }
    return data
  } catch (error) {
    next(error);
  }
};

module.exports = { dashboardMesh };
