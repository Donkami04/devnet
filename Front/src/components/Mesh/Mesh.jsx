import { useEffect, useState } from "react";
import { getMesh } from "../../utils/Api-candelaria/api";
import { Navbar } from "../Navbar/Navbar";
import { DashMesh } from "./DashMesh/DashMesh";
import { PRTG_URL } from "../../utils/Api-candelaria/api";
import { Spinner } from "../Spinner/Spinner";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import "./mesh.css";

export function Mesh() {
  const [dataMesh, setDataMesh] = useState([]);
  const [filterByPala, setFilterByPala] = useState(false);
  const [filterByCaex, setFilterByCaex] = useState(false);
  const [statusFilter, setStatusFilter] = useState("2");
  const [showSpinner, setShowSpinner] = useState(true);
  const tableToShow = "mesh";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const meshData = await getMesh();
        setDataMesh(meshData.data);
        setShowSpinner(false);
      } catch (error) {
        console.error(
          "Error al obtener el listado de dispositivos MESH:",
          error
        );
        return error;
      }
    };
    fetchData();
  }, []);

  const filteredData = dataMesh
    .filter((device) => !filterByPala || device.device.includes("Pala"))
    .filter((device) => !filterByCaex || device.device.includes("Caex"))
    .filter(
      (device) =>
        statusFilter === "" || device.status_dispatch.includes(statusFilter)
    );

  const renderRowCount = () => {
    const rowCount = filteredData.length;
    return (
      <div className="row-count" style={{ fontSize: "0.8rem" }}>
        Total de elementos: {rowCount}
      </div>
    );
  };
  if (showSpinner) {
    return (
      <div>
        <Navbar title={"Equipos Mesh Críticos"} />
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <Navbar title={"Equipos Mesh Críticos"} />
      <DatetimeModules module={"mesh"} name={"mesh"} />
      <DashMesh />
      <div>
        <div className="filter-mesh-container">
          <label>Status Dispatch: </label>
          <input
            className="text-input-mesh"
            type="text"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <label>
            <input
              className="checkbox-filter box-mesh"
              type="checkbox"
              checked={filterByPala}
              onChange={() => setFilterByPala(!filterByPala)}
            />
            Palas
          </label>
          <label>
            <input
              className="checkbox-filter box-mesh"
              type="checkbox"
              checked={filterByCaex}
              onChange={() => setFilterByCaex(!filterByCaex)}
            />
            Caex
          </label>
        </div>
        <main className="mesh-table-container">
          <table className="mesh-table">
            <thead>
              <tr>
                <th>IP Host</th>
                <th>Device</th>
                <th>Ping (PRTG) Avg 30 Minutos</th>
                <th>Niveles AP (WLC)</th>
                <th>Conectado a</th>
                <th>Dispatch</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((device) => {
                let colorNivelSenal = "";
                let colorNivelSnr = "";
                let colorPacketLoss = "";
                let colorAvgPing = "";
                const nivelSenal = Math.abs(parseInt(device.nivel_senal));

                if (nivelSenal >= 85) {
                  colorNivelSenal = "kpi-red";
                } else if (nivelSenal > 80 && nivelSenal < 85) {
                  colorNivelSenal = "kpi-yellow";
                }

                if (device.snr !== "Not Found" || device.snr !== "N/A") {
                  const nivelSnr = device.snr;
                  if (nivelSnr <= 10) {
                    colorNivelSnr = "kpi-red";
                  } else if (nivelSnr > 10 && nivelSnr <= 13) {
                    colorNivelSnr = "kpi-yellow";
                  }
                }

                if (device.packet_loss !== "Not Found") {
                  let packetLoss = device.packet_loss;
                  packetLoss = parseInt(packetLoss, 10);
                  if (packetLoss > 2 && packetLoss < 5) {
                    colorPacketLoss = "kpi-yellow";
                  } else if (packetLoss >= 5) {
                    colorPacketLoss = "kpi-red";
                  }
                }

                if (device.ping_avg !== "Not Found") {
                  if (parseFloat(device.ping_avg.replace(".", "")) >= 500) {
                    colorAvgPing = "kpi-red";
                  } else if (
                    parseFloat(device.ping_avg.replace(".", "")) > 350 &&
                    parseFloat(device.ping_avg.replace(".", "")) < 500
                  ) {
                    colorAvgPing = "kpi-yellow";
                  }
                }

                return (
                  <tr key={device.id}>
                    <td>{device.ip}</td>
                    <td>
                      <a href={`${PRTG_URL}${device.id_prtg}`} target="_blank">
                        {device.device}
                      </a>
                    </td>
                    <td>
                      <p>
                        <span>Ping Avg: </span>
                        <span className={`mesh-valor ${colorAvgPing}`}>
                          {device.ping_avg}
                        </span>
                      </p>
                      <p>
                        <span>Minimo: </span>
                        {device.minimo}
                      </p>
                      <p>
                        <span>Maximo: </span>
                        {device.maximo}
                      </p>
                      <p>
                        <span>Packet Loss: </span>
                        <span className={`mesh-valor ${colorPacketLoss}`}>
                          {device.packet_loss}
                        </span>
                      </p>
                      <p>
                        <span>LastValue: </span>
                        {device.lastvalue}
                      </p>
                      <p>
                        <span>LastUp: </span>
                        {device.lastup}
                      </p>
                      <p>
                        <span>LastDown: </span>
                        {device.lastdown}
                      </p>
                    </td>
                    <td>
                      <p>
                        <span>Nivel Señal: </span>
                        <span className={`mesh-valor ${colorNivelSenal}`}>
                          {device.nivel_senal}
                        </span>
                      </p>
                      <p>
                        <span>Contador Fail Nivel Señal: </span>
                        {device.fail_senal}
                      </p>
                      <p>
                        <span>Duración Última Falla: </span>
                        {device.fail_time_senal} min
                      </p>
                      <p>
                        <span>SNR Cliente: </span>
                        {device.ruido_senal}
                      </p>
                      <p>
                        <span>Tiempo Conexión: </span>
                        {device.tiempo_conexion}
                      </p>
                    </td>
                    <td>
                      <p>
                        <span>Conectado a: </span>
                        {device.conectado_a}
                      </p>
                      <div>
                        <p>
                          <span>Distancia:</span>
                          {device.distance === 0.0
                            ? "Not Found"
                            : `${device.distance} metros`}
                        </p>
                        <p>
                          <span>Nivel de SNR: </span>
                          <span className={`mesh-valor ${colorNivelSnr}`}>
                            {device.snr}
                          </span>
                        </p>
                        <p>
                          <span>Contador Fail SNR: </span>
                          {device.fail_snr}
                        </p>
                        <p>
                          <span>Duración Última Falla: </span>
                          {device.fail_time_snr} min
                        </p>
                      </div>
                    </td>

                    <td>
                      <p>
                        <span>Status Dispatch: </span>
                        {device.status_dispatch}
                      </p>
                      <p>
                        <span>Operador: </span>
                        {device.operador}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
        {renderRowCount()}
      </div>
    </div>
  );
}
