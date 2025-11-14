import React, { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { getDataMeshProcess } from "../../utils/Api-candelaria/api";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import "./MeshProcess.css";

export function MeshProcess() {
  const [processMesh, setProcessMesh] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDown, setFilterDown] = useState(false); // Estado para controlar el filtro "down"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataMeshProcess();
        const meshData = await response.data;
        meshData.sort((a, b) => {
          if (a.status === "fail" && b.status !== "fail") {
            return -1; // a debe ir antes que b
          } else if (a.status !== "fail" && b.status === "fail") {
            return 1; // b debe ir antes que a
          } else {
            return 0; // no se cambia el orden
          }
        });
        setProcessMesh(meshData);
      } catch (error) {
        console.error("Error al obtener la data del process mesh", error);
        return error;
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Lógica para filtrar los dispositivos marcados como "down" si el filtro está activado
  const filteredProcessMesh = processMesh.filter((device) => {
    const includesSearchTerm =
      Object.values(device).some((value) =>
        (value ?? "").toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) || searchTerm === "";

    const prtgStatus = device.prtg_status?.toLowerCase?.() || "";

    return includesSearchTerm && (!filterDown || prtgStatus.includes("down"));
  });

  const handleFilterDownChange = (event) => {
    setFilterDown(event.target.checked);
  };

  return (
    <div>
      <Navbar title={"Clientes Open Pit"} />
      <DatetimeModules module={"mesh_process"} name={"Clientes Mesh"} />
      <div className="filtres-processmesh-container">
        <input
          className="input-mesh-process"
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <label className="label-mesh-process">
          <input
            type="checkbox"
            checked={filterDown}
            onChange={handleFilterDownChange}
            className="checkbox-mesh-process"
          />
          Clientes PRTG Down
        </label>
      </div>
      <div className="counter-processmesh">
        {filteredProcessMesh.length} resultado{filteredProcessMesh.length !== 1 ? "s" : ""}
      </div>
      <div className="container-process-mesh-table">
        <table className="process-mesh-table">
          <thead>
            <tr>
              <th>Ubicación</th>
              <th>Dispositivo</th>
              <th>Cliente</th>
              <th>MAC</th>
            </tr>
          </thead>
          <tbody>
            {filteredProcessMesh.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "1rem", color: "red" }}>
                  No hay coincidencias
                </td>
              </tr>
            ) : (
              filteredProcessMesh.map((device) => (
                <tr key={device?.id ?? Math.random()}>
                  <td>{device?.ubication ?? "Sin confirmar"}</td>
                  <td>{device?.device ?? "Sin confirmar"}</td>
                  <td
                    className={
                      device?.prtg_status?.toLowerCase?.().includes("up")
                        ? "kpi-green"
                        : device?.prtg_status?.toLowerCase?.().includes("down")
                        ? "kpi-red"
                        : device?.prtg_status?.toLowerCase?.().includes("paused")
                        ? "kpi-blue"
                        : device?.prtg_status?.toLowerCase?.().includes("warning")
                        ? "kpi-yelllow"
                        : device?.prtg_status?.toLowerCase?.().includes("unusual")
                        ? "kpi-orange"
                        : ""
                    }
                    title={
                      device?.prtg_status?.includes("operando")
                        ? "Pala no operativa"
                        : `PRTG: ${device?.prtg_status ?? "Desconocido"}`
                    }
                    style={device?.prtg_status !== "Not Found" && device?.prtg_status !== null ? { cursor: "help", color: "white" } : {}}
                  >
                    {device?.client ?? "Sin confirmar"}
                  </td>
                  <td
                    title={
                      device?.status === "fail"
                        ? "Mac repetida en otro cliente"
                        : ""
                    }
                    className={device?.status === "fail" ? "kpi-red" : ""}
                    style={device?.status === "fail" ? { cursor: "help", color: "white" } : {}}
                  >
                    {device?.current_mac ?? "Sin confirmar"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
