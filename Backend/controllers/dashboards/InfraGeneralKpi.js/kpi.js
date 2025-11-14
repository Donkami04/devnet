const { useDataInfGen } = require("../infra_general.js");

// const responseInf = async () => {
//     // const data = await useDataInfGen();
//     // console.log("Este es el responseInf");
//     // console.log(data.upElements.length);
//     // console.log(data.downElements.length);
//     const data = await extractInfraestructuraData();
//     console.log(data);
// }

const axios = require("axios");
const fs = require("fs");

const BASE_API_URL = "http://10.224.116.14:3001/api/v1/candelaria"; // Cambia si es producción

async function getData(endpoint) {
    try {
        const response = await axios.get(`${BASE_API_URL}/${endpoint}`, {
            timeout: 5000 // 5 segundos
        });
        return response.data;
    } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err.message);
        return { data: [] }; // Retorna estructura mínima esperada
    }
}
  

async function extractInfraestructuraData() {
    const [
        infraGeneral,
        prtgUpDown,
        interfaces,
        health,
        neighbors,
        defaultRoute,
        prtgGroups,
        dockers,
        licencias
    ] = await Promise.all([
        getData("infra_general"),
        getData("group-prtg/updown"),
        getData("interfaces"),
        getData("system-health"),
        getData("neighbors"),
        getData("route-default"),
        getData("group-prtg"),
        getData("dockers"),
        getData("licenciamientos")
    ]);
    const upElements = [];
    const downElements = [];

    // Clasificadores
    const addToUpOrDown = (element, isUp) => {
        if (isUp) upElements.push(element);
        else downElements.push(element);
    };

    // Interfaces
    interfaces.data.forEach((e) => {
        if (e.name?.includes("Traffic")) {
            if (e.status === "Up" || e.status.toLowerCase().includes("paused")) addToUpOrDown(e, true);
            if (e.status.includes("Down")) addToUpOrDown(e, false);
        }
    });

    // Neighbors
    neighbors.data.forEach((e) => {
        if (e.neighbor) addToUpOrDown(e, e.status === "Up");
    });

    // System Health (simplificada)neighbors.forEach
    health.data.forEach((e) => {
        if (!e.name && !e.name_switch) return;
        if (e.status === "Up") addToUpOrDown(e, true);
        else if (e.status.includes("Down")) addToUpOrDown(e, false);
    });

    // Default Route
    defaultRoute.data.forEach((e) => {
        if (e.via_bgp === "true") addToUpOrDown(e, true);
        else if (e.via_bgp === "false") addToUpOrDown(e, false);
    });

    // PrtgGroups
    prtgGroups.data?.forEach((e) => {
        if (e.status.includes("Up")) addToUpOrDown(e, true);
        else if (e.status.includes("Down")) addToUpOrDown(e, false);
    });

    // Dockers
    dockers.dataContainers?.forEach((e) => {
        const isOk = e.type === "docker" &&
            e.status.includes("running") &&
            e.cpu_usage_percent <= 70 &&
            e.memory_usage_percent <= 60;
        addToUpOrDown(e, isOk);
    });

    // Licencias
    licencias.data?.data?.forEach((e) => {
        if (e.status === "Up" || e.status === "Warning") addToUpOrDown(e, true);
        else if (e.status === "Down") addToUpOrDown(e, false);
    });

    // Procesamiento InfraGeneral
    const resultadoInfra = infraGeneral.data
        .filter((sw) => sw.name_switch !== "WLC 9800 NEGOCIO")
        .map((sw) => {
            const downElem = downElements.filter((e) => e.name_switch === sw.name_switch);
            const upElem = upElements.filter((e) => e.name_switch === sw.name_switch);
            const swStatus = downElem.length > 0 ? "FAIL" : "OK";

            return {
                id: sw.id,
                name_switch: sw.name_switch,
                rol: sw.rol,
                ip: sw.ip,
                swStatus,
                upCount: upElem.length,
                downCount: downElem.length,
                upElem,
                downElem,
            };
        })
        .sort((a, b) => (a.swStatus === "FAIL" ? -1 : 1));

    const output = {
        infraestructura_general: resultadoInfra,
        grupos_prtg: prtgUpDown,
    };

    // fs.writeFileSync("infraestructura_resultado.json", JSON.stringify(output, null, 2), "utf-8");
    // console.log("✅ Archivo generado: infraestructura_resultado.json");
    return output
}

// extractInfraestructuraData();


module.exports = { extractInfraestructuraData }