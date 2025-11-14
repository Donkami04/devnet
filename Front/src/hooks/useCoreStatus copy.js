import { useDataInfGen } from "./useDataInfGen";
// console.log(data)

export const useCoreStatus = async () => {
  try {
    const data = await useDataInfGen();

    const coreAdminUp = data.upElements.filter(
      (e) => e.name_switch === "SW CORE ADMIN" && e.status === "Up"
    );
    const coreAdminDown = data.downElements.filter(
      (e) => e.name_switch === "SW CORE ADMIN" && e.status.includes("Down")
    );
    const coreConceUp = data.upElements.filter(
      (e) => e.name_switch === "SW CORE CONCE" && e.status === "Up"
    );
    const coreConceDown = data.downElements.filter(
      (e) => e.name_switch === "SW CORE CONCE" && e.status.includes("Down")
    );
    const coreOjosUp = data.upElements.filter(
      (e) => e.name_switch === "SW CORE OJOS" && e.status === "Up"
    );
    const coreOjosDown = data.downElements.filter(
      (e) => e.name_switch === "SW CORE OJOS" && e.status.includes("Down")
    );
    const wlcMeshUp = data.upElements.filter(
      (e) =>
        (e.device && e.device.includes("WLC 9800 MESH")) ||
        (e.device && e.device.includes("WLC 9800 MESH"))
    );
    const wlcMeshDown = data.downElements.filter(
      (e) =>
        (e.device && e.device.includes("WLC 9800 MESH")) ||
        (e.device && e.device.includes("WLC 9800 MESH"))
    );
    const wlcNegocioUp = data.upElements.filter(
      (e) =>
        (e.device && e.device.includes("WLC 9800 NEGOCIO")) ||
        (e.device && e.device.includes("WLC 9800 NEGOCIO"))
    );
    const wlcNegocioDown = data.downElements.filter(
      (e) =>
        (e.device && e.device.includes("WLC 9800 NEGOCIO")) ||
        (e.device && e.device.includes("WLC 9800 NEGOCIO"))
    );
    const fwOtUp = data.upElements.filter((e) => e.rol && e.rol === "FW OT");
    const fwOtDown = data.downElements.filter(
      (e) => e.rol && e.rol === "FW OT"
    );
    const telefoniaUp = data.upElements.filter(
      (e) => e.rol && e.rol.toUpperCase() === "TELEFONIA IP"
    );
    const telefoniaDown = data.downElements.filter(
      (e) => e.rol && e.rol.toUpperCase() === "TELEFONIA IP"
    );
    const swDistAdmUp = data.upElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("SW DIST ADM")) ||
        (e.device && e.device.includes("SW DIST ADM"))
    );
    const swDistAdmDown = data.downElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("SW DIST ADM")) ||
        (e.device && e.device.includes("SW DIST ADM"))
    );
    const swDistConceUp = data.upElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("SW DIST CONC")) ||
        (e.device && e.device.includes("SW DIST CONC"))
    );
    const swDistConceDown = data.downElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("SW DIST CONC")) ||
        (e.device && e.device.includes("SW DIST CONC"))
    );
    const swCoreOtAdminUp = data.upElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("SW-CORE-OT-ADMIN")) ||
        (e.device && e.device.includes("SW-CORE-OT-ADMIN"))
    );
    const swCoreOtAdminDown = data.downElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("SW-CORE-OT-ADMIN")) ||
        (e.device && e.device.includes("SW-CORE-OT-ADMIN"))
    );
    const swCoreOtConceUp = data.upElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("SW-CORE-OT-CONCE")) ||
        (e.device && e.device.includes("SW-CORE-OT-CONCE"))
    );
    const swCoreOtConceDown = data.downElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("SW-CORE-OT-CONCE")) ||
        (e.device && e.device.includes("SW-CORE-OT-CONCE"))
    );
    const ccumSubUp = data.upElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("CCUM-SUB")) ||
        (e.device && e.device.includes("CCUM-SUB"))
    );
    const ccumSubDown = data.downElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("CCUM-SUB")) ||
        (e.device && e.device.includes("CCUM-SUB"))
    );
    const uccxUp = data.upElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("UCCX01")) ||
        (e.device && e.device.includes("UCCX01"))
    );
    const uccxDown = data.downElements.filter(
      (e) =>
        (e.name_switch && e.name_switch.includes("UCCX01")) ||
        (e.device && e.device.includes("UCCX01"))
    );
    const cctvAdminUp = data.upElements.filter(
      (e) =>
        e.device &&
        e.device.includes("CLCANASM") &&
        e.rol &&
        e.rol.includes("CCTV")
    );
    const cctvAdminDown = data.downElements.filter(
      (e) =>
        (e.device && e.device.includes("CLCANASM") && e.rol && e.rol.includes("CCTV"))
    );
    const cctvOjosUp = data.upElements.filter(
      (e) =>
        (e.device && e.device.includes("CLOJOSASM") && e.rol && e.rol.includes("CCTV"))
    );
    const cctvOjosDown = data.downElements.filter(
      (e) =>
        (e.device && e.device.includes("CLOJOSASM") && e.rol && e.rol.includes("CCTV"))
    );
    const adminDnaUp = data.upElements.filter(
      (e) =>
        (e.device && e.device.includes("CLOJOSASM") && e.rol && e.rol.includes("CCTV"))
    );
    const adminDnaDown = data.downElements.filter(
      (e) =>
        (e.device && e.device.includes("CLOJOSASM") && e.rol && e.rol.includes("CCTV"))
    );

    // Calculo de porcentajes
    const coreAdminUpPercent = Math.floor(
      (coreAdminUp.length / (coreAdminUp.length + coreAdminDown.length)) * 100
    );
    const coreConceUpPercent = Math.floor(
      (coreConceUp.length / (coreConceUp.length + coreConceDown.length)) * 100
    );
    const coreOjosUpPercent = Math.floor(
      (coreOjosUp.length / (coreOjosUp.length + coreOjosDown.length)) * 100
    );
    const wlcMeshUpPercent = Math.floor(
      (wlcMeshUp.length / (wlcMeshUp.length + wlcMeshDown.length)) * 100
    );
    const wlcNegocioUpPercent = Math.floor(
      (wlcNegocioUp.length / (wlcNegocioUp.length + wlcNegocioDown.length)) *
        100
    );
    const fwOtUpPercent = Math.floor(
      (fwOtUp.length / (fwOtUp.length + fwOtDown.length)) * 100
    );
    const telefoniaUpPercent = Math.floor(
      (telefoniaUp.length / (telefoniaUp.length + telefoniaDown.length)) * 100
    );
    const swDistAdmPercent = Math.floor(
      (swDistAdmUp.length / (swDistAdmUp.length + swDistAdmDown.length)) * 100
    );
    const swDistConceUpPercent = Math.floor(
      (swDistConceUp.length / (swDistConceUp.length + swDistConceDown.length)) *
        100
    );
    const swCoreOtAdminUpPercent = Math.floor(
      (swCoreOtAdminUp.length /
        (swCoreOtAdminUp.length + swCoreOtAdminDown.length)) *
        100
    );
    const swCoreOtConceUpPercent = Math.floor(
      (swCoreOtConceUp.length /
        (swCoreOtConceUp.length + swCoreOtConceDown.length)) *
        100
    );
    const ccumSubUpPercent = Math.floor(
      (ccumSubUp.length / (ccumSubUp.length + ccumSubDown.length)) * 100
    );
    const uccxUpPercent = Math.floor(
      (uccxUp.length / (uccxUp.length + uccxDown.length)) * 100
    );
    const cctvAdminUpPercent = Math.floor(
      (cctvAdminUp.length / (cctvAdminUp.length + cctvAdminDown.length)) * 100
    );
    const cctvOjosUpPercent = Math.floor(
      (cctvOjosUp.length / (cctvOjosUp.length + cctvOjosDown.length)) * 100
    );

    return {
      coreAdminUpPercent: coreAdminUpPercent,
      colorAdminCore: getColorStatus(coreAdminUpPercent),
      coreConceUpPercent: coreConceUpPercent,
      colorConceCore: getColorStatus(coreConceUpPercent),
      coreOjosUpPercent: coreOjosUpPercent,
      colorOjosCore: getColorStatus(coreOjosUpPercent),
      wlcMeshUpPercent: wlcMeshUpPercent,
      colorWlcMesh: getColorStatus(wlcMeshUpPercent),
      wlcNegocioUpPercent: wlcNegocioUpPercent,
      colorWlcNegocio: getColorStatus(wlcNegocioUpPercent),
      fwOtUpPercent: fwOtUpPercent,
      colorFwOt: getColorStatus(fwOtUpPercent),
      telefoniaUpPercent: telefoniaUpPercent,
      colorTelefonia: getColorStatus(telefoniaUpPercent),
      swDistAdmPercent: swDistAdmPercent,
      colorSwDistAdm: getColorStatus(swDistAdmPercent),
      swDistConceUpPercent: swDistConceUpPercent,
      colorSwDistConce: getColorStatus(swDistConceUpPercent),
      swCoreOtAdminUpPercent: swCoreOtAdminUpPercent,
      colorSwCoreOtAdmin: getColorStatus(swCoreOtAdminUpPercent),
      swCoreOtConceUpPercent: swCoreOtConceUpPercent,
      colorSwCoreOtConce: getColorStatus(swCoreOtConceUpPercent),
      ccumSubUpUpPercent: ccumSubUpPercent,
      colorCcumSubUp: getColorStatus(ccumSubUpPercent),
      uccxUpPercent: uccxUpPercent,
      colorUccxubUp: getColorStatus(uccxUpPercent),
      cctvAdminUpPercent: cctvAdminUpPercent,
      colorCctvAdmin: getColorStatus(cctvAdminUpPercent),
      cctvOjosUpPercent: cctvOjosUpPercent,
      colorCctvOjos: getColorStatus(cctvOjosUpPercent),
    };
  } catch (error) {
    console.error(error);
  }
};

function getColorStatus(percent) {
  if (70 <= percent && percent < 100) {
    return "yellow";
  }
  if (percent < 70) {
    return "red";
  }
  if (percent === 100) {
    return "green";
  }
}
