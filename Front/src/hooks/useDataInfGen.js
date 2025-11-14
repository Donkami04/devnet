// Se encarga de clasificar todos los elementos de la Infraestructura General
// en dos arrays, Up o Down.

import {
  getInterfaces,
  getSystemHealth,
  getNeighbors,
  getDefaultRoute,
  getDataInfGen,
  getAp,
  getDataPrtgGroups,
  getDataDockers,
  getLicenciamientos,
} from "../utils/Api-candelaria/api";

export async function useDataInfGen() {
  const dataInterfaces = await getInterfaces();
  const dataDevicesHealth = await getSystemHealth();
  const dataNeighbors = await getNeighbors();
  const dataRouteStatus = await getDefaultRoute();
  const dataDockers = await getDataDockers();
  const dataPrtgGroups = await getDataPrtgGroups();
  const licenciamientos = await getLicenciamientos();

  const allData = [
    ...dataInterfaces.data,
    ...dataDevicesHealth.data,
    ...dataNeighbors.data,
    ...dataRouteStatus.data,
    ...dataPrtgGroups.data,
    ...dataDockers.dataContainers
  ];

  const upElements = [];
  const downElements = [];

  const licenciamientosUpOrDown = (dataList) => {
    dataList.forEach((element) => {
      if (element.status === "Up" || element.status === "Warning") {
        upElements.push(element);
      }
      if (element.status === "Down") {
        downElements.push(element);
      }
    });
  }

  const upOrDownInterface = (dataList) => {
    dataList.forEach((element) => {
      if (element.name && element.name.includes("Traffic")) {
        if (
          element.status === "Up" ||
          element.status.toLowerCase().includes("paused")
        ) {
          upElements.push(element);
        }

        if (element.status.includes("Down")) {
          downElements.push(element);
        }
      }
    });
  };

  const upOrDownNeighbors = (dataList) => {
    dataList.forEach((element) => {
      if (element.neighbor) {
        if (element.status === "Up") {
          upElements.push(element);
        }
        if (element.status === "Down") {
          downElements.push(element);
        }
      }
    });
  };

  const upOrDownSysHealth = (dataList) => {
    dataList.forEach((element) => {
      // Primer If es porque los neighbors no tienen `name`
      if (element.name && element.name.includes("System Health") || (element.name_switch && element.name_switch.includes("FAC"))) {
        if (
          element.status === "Up" &&
          element.name.includes("CPU") &&
          parseInt(element.lastvalue) <= 90
        ) {
          upElements.push(element);
        }
        if (
          (element.name.includes("CPU") && parseInt(element.lastvalue) > 90) ||
          (element.name.includes("CPU") && element.status.includes("Down"))
        ) {
          downElements.push(element);
        }
        if (
          (element.status === "Up" &&
            element.name.includes("Power Supplies") &&
            element.lastvalue === "Normal") ||
          (element.status.toLowerCase().includes("paused") &&
            element.name.includes("Power Supplies") &&
            element.lastvalue === "-")
        ) {
          upElements.push(element);
        }
        if (
          (element.name.includes("Power Supplies") &&
            element.lastvalue !== "Normal" &&
            element.lastvalue !== "-") ||
          (element.name.includes("Power Supplies") &&
            element.status.includes("down"))
        ) {
          downElements.push(element);
        }
        if (element.status.includes("Down")) {
          downElements.push(element);
        }
        if (
          element.status === "Up" &&
          element.name.includes("Temperatures") &&
          parseInt(element.lastvalue) < 70
        ) {
          upElements.push(element);
        }
        if (
          (element.name.includes("Temperatures") &&
            parseInt(element.lastvalue) >= 70) ||
          (element.name.includes("Temperatures") &&
            element.status.includes("Down"))
        ) {
          downElements.push(element);
        }

        if (
          (element.name.includes("Memory") &&
            element.name_switch === "WLC 9800 NEGOCIO" &&
            parseInt(element.lastvalue.replace(".", "")) <= 1000) ||
          (element.name.includes("Memory") &&
            element.name_switch === "WLC 9800 NEGOCIO" &&
            element.status.includes("Down"))
        ) {
          downElements.push(element);
        }
        if (
          element.name.toLowerCase().includes("ping") &&
          element.status.toLowerCase().includes("up")
        ) {
          upElements.push(element);
        }
        if (
          element.name.toLowerCase().includes("ping") &&
          element.status.toLowerCase().includes("down")
        ) {
          downElements.push(element);
        }
        if (element.status === "Up" && element.name.includes("Disk") && parseInt(element.lastvalue) <= 90) {
          upElements.push(element);
        }
        if (
          (element.name.includes("Disk") && parseInt(element.lastvalue) > 90) ||
          (element.name.includes("Disk") && element.status.includes("Down"))
        ) {
          downElements.push(element);
        }
        if (element.status === "Up" && element.name.includes("Memory Usage") && parseInt(element.lastvalue) <= 90) {
          upElements.push(element);
        }
        if (
          (element.name.includes("Memory Usage") && parseInt(element.lastvalue) > 90) ||
          (element.name.includes("Memory Usage") && element.status.includes("Down"))
        ) {
          downElements.push(element);
        }
        if (element.status === "Up" && element.name.includes("Usuarios") && parseInt(element.lastvalue) > 50) {
          upElements.push(element);
        }
        if (
          (element.name.includes("Usuarios") && parseInt(element.lastvalue) <= 50) ||
          (element.name.includes("Usuarios") && element.status.includes("Down"))
        ) {
          downElements.push(element);
        }
      }
    });
  };

  const upOrDownRouteDefault = (dataList) => {
    dataList.forEach((element) => {
      if (element.via_bgp) {
        if (element.via_bpg === "true") {
          upElements.push(element);
        }
        if (element.via_bgp === "false") {
          downElements.push(element);
        }
      }
    });
  };

  // Clasificacion de AP
  dataPrtgGroups.data.forEach((element) => {
    if (element.status.includes("Down")) {
      downElements.push(element);
    }
    if (element.status.includes("Up")) {
      upElements.push(element);
    }
  });

  const upOrDownDockers = (dataList) => {
    dataList.forEach((element) => {
      if (element.type === "docker") {
        if (
          element.status.includes("running") &&
          element.cpu_usage_percent <= 70 &&
          element.memory_usage_percent <= 60
        ) {
          upElements.push(element);
        }
        if (
          !element.status.includes("running") ||
          element.cpu_usage_percent > 70 ||
          element.memory_usage_percent > 60
        ) {
          downElements.push(element);
        }
      }
    });
  };

  upOrDownInterface(allData);
  upOrDownNeighbors(allData);
  upOrDownSysHealth(allData);
  upOrDownRouteDefault(allData);
  upOrDownDockers(allData);
  licenciamientosUpOrDown(licenciamientos.data.data);

  const data = {
    upElements: upElements,
    downElements: downElements,
  };

  return data;
}
