import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useDataInfGen } from "../../../hooks/useDataInfGen";
import PuffLoader from "react-spinners/PuffLoader";
import "./InfraGeneralDash.css";
import { Link } from "react-router-dom";
import { FaNetworkWired } from "react-icons/fa";
import { getKpiInfGen } from "../../../utils/Api-candelaria/api"
import { FaEye } from "react-icons/fa";

export function InfraGeneralDash() {
  const [infGenDashUp, setIinfGenDashUp] = useState({});
  const [infGenDashDown, setIinfGenDashDown] = useState({});
  const [spinnerInfra, setSpinnerInfra] = useState(true);
  const [tempSensUp, setTempSensUp] = useState([]);
  const [tempSensDown, setTempSensDown] = useState([]);
  const [kpi, setKpi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useDataInfGen();
        const kpiData = await getKpiInfGen();
        const elementsTempUp = [];
        const elementsTempDown = [];
        result.upElements.forEach((element) => {
          if (element.name && element.name.includes("Temperatures")) {
            elementsTempUp.push(element);
          }
        });
        result.downElements.forEach((element) => {
          if (element.name && element.name.includes("Temperatures")) {
            elementsTempDown.push(element);
          }
        });
        setTempSensUp(elementsTempUp);
        setTempSensDown(elementsTempDown);
        setIinfGenDashUp(result.upElements.length);
        setIinfGenDashDown(result.downElements.length);
        setSpinnerInfra(false);
        setKpi(kpiData.data.data)
      } catch (error) {
        console.error("Error InfraGeneralDash:", error);
      }
    };

    fetchData();
  }, []);

  if (spinnerInfra) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <PuffLoader color="red" />
      </div>
    );
  }

  return (
    <>
    <div style={{display:"flex", justifyContent: "center", gap: "10px"}}>
      <span style={{fontWeight: "bold"}}>KPI:</span>
      <span>{kpi}%</span>
    </div>
      <table className="infra-dash-table">
        <thead>
          <tr>
            <th><FaInfoCircle color="#545454" /></th>
            <th className="kpi-green">Up</th>
            <th className="kpi-red">Down</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>General</td>
            <td>{infGenDashUp}</td>
            <td>{infGenDashDown}</td>
            <td>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Link
                  title={"Mapa"}
                  style={{ width: "20px" }}
                  className="link-open-pit"
                  to="/monitoreo/infraestrucura-general/map"
                >
                  <FaNetworkWired />
                </Link>
                <Link
                  title={"Ver detalles"}
                  style={{ width: "20px" }}
                  className="link-open-pit"
                  to="/monitoreo/infraestrucura-general/categorias"
                >
                  <FaEye />
                </Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>Temperaturas</td>
            <td>{tempSensUp.length}</td>
            <td>{tempSensDown.length}</td>
            <td>
              <Link
                title={"Ver detalles"}
                style={{ width: "20px" }}
                className="link-open-pit"
                to="/monitoreo/infraestrucura-general/detalles?nombre=System%20Health%20Temperatures"
              >
                <FaEye />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
