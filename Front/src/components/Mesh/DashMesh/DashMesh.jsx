import { useEffect, useState } from "react";
import { getMeshIndicators } from "../../../utils/Api-candelaria/api";
import PuffLoader from "react-spinners/PuffLoader";
import "./dashmesh.css";

export function DashMesh() {
  const [indicatorsMesh, setIndicatorsMesh] = useState(null);
  const [spinnerMesh, setSpinnerMesh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const indicators = await getMeshIndicators();
        setIndicatorsMesh(indicators);
        setSpinnerMesh(false);
      } catch (error) {
        console.error("Error al obtener el listado de indicadores MESH:", error);
      }
    };
    fetchData();
  }, []);

    const currentTab = document.title; 
    const tableClassName = currentTab === "Home" ? "mesh-dash-table-home" : "mesh-dash-table";
  
  if (spinnerMesh) {
    return (
      <div className="spinner-dash-container">
        <PuffLoader color="red" />
      </div>
    );
  }

  return (
    <>
        <table className={tableClassName}>
          <thead>
            <tr>
              <th>DISPOSITIVO</th>
              <th>OPERANDO</th>
              <th className="kpi-green">OK</th>
              <th className="kpi-yellow">WARNING</th>
              <th className="kpi-red">FALLAS</th>
            </tr>
          </thead>
          <tbody>
            {indicatorsMesh ? (
              <>
                <tr>
                  <td>PALAS</td>
                  <td>{indicatorsMesh.palasStatus2}/{indicatorsMesh.palasTotales}</td>
                  <td>{indicatorsMesh.palasOk}</td>
                  <td>{indicatorsMesh.palasWarnings}</td>
                  <td>{indicatorsMesh.palasFailed}</td>
                </tr>
                <tr>
                  <td>CAEX</td>
                  <td>{indicatorsMesh.caexStatus2}/{indicatorsMesh.caexTotales}</td>
                  <td>{indicatorsMesh.caexOk}</td>
                  <td>{indicatorsMesh.caexWarnings}</td>
                  <td>{indicatorsMesh.caexFailed}</td>
                </tr>
                <tr>
                  <td>TOTAL</td>
                  <td>{indicatorsMesh.palasStatus2 + indicatorsMesh.caexStatus2}/{indicatorsMesh.caexTotales + indicatorsMesh.palasTotales}</td>
                  <td>{indicatorsMesh.palasOk + indicatorsMesh.caexOk}</td>
                  <td>{indicatorsMesh.palasWarnings + indicatorsMesh.caexWarnings}</td>
                  <td>{indicatorsMesh.palasFailed + indicatorsMesh.caexFailed}</td>
                </tr>
              </>
            ) : (
              <tr>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
                <td>Cargando...</td>
              </tr>
            )}
          </tbody>
        </table>
    </>
  );
}
