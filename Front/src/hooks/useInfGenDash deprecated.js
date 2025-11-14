import {
  getInterfaces,
  getSystemHealth,
  getNeighbors,
  getDefaultRoute,
} from "../utils/Api-candelaria/api";

export const useInfGenDash = async () => {
  const dataInterfaces = await getInterfaces();
  const dataDevicesHealth = await getSystemHealth();
  const dataRouteStatus = await getDefaultRoute();
  const dataNeighbors = await getNeighbors();

  const upElements = [];
  const downElements = [];
  dataInterfaces.forEach((element) => {
    if (
      element.status === "Up" ||
      element.status.toLowerCase().includes("Paused")
    ) {
      upElements.push(element);
    }
    if (element.status.includes("Down")) {
      downElements.push(element);
    }
  });

  dataNeighbors.forEach((element) => {
    if (element.status === "Up") {
      upElements.push(element);
    }
    if (element.status.includes("Down")) {
      downElements.push(element);
    }
  });

  dataDevicesHealth.forEach((element) => {
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
      element.status === "Up" &&
      element.name.includes("Power Supplies") &&
      element.lastvalue === "Normal"
    ) {
      upElements.push(element);
    }
    if (
      (element.name.includes("Power Supplies") &&
        element.lastvalue !== "Normal") ||
      (element.name.includes("Power Supplies") &&
        element.status.includes("Down"))
    ) {
      downElements.push(element);
    }
    if (
      element.status === "Up" &&
      element.name.includes("Temperatures") &&
      parseInt(element.lastvalue) < 50
    ) {
      upElements.push(element);
    }
    if (
      (element.name.includes("Temperatures") &&
        parseInt(element.lastvalue) >= 50) ||
      (element.name.includes("Temperatures") && element.status.includes("Down"))
    ) {
      downElements.push(element);
    }
  });

  const data = {
    upElements: upElements.length,
    downElements: downElements.length,
  };

  return data;
};
