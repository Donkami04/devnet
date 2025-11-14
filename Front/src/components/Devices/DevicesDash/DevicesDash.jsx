import { useEffect, useState } from "react";
import { getDevicesIndicators } from "../../../utils/Api-candelaria/api";
import PuffLoader from "react-spinners/PuffLoader";
import "./devicesdash.css";

export function DevicesDash() {
  const [indicatorsDevices, setIndicatorsDevices] = useState(null);
  const [spinnerDevices, setSpinnerDevices] = useState(true);
  const [showApiMessage, setShowApiMessage] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const indicators = await getDevicesIndicators();
        if (indicators.statusCode === 200) {
          setIndicatorsDevices(indicators.data);
          
          setSpinnerDevices(false);
        } else {
          setShowApiMessage(true);
          setApiMessage(indicators.message);
          console.error("Error al obtener los calculos de los dispositivos");
        }
      } catch (error) {
        console.error("Error al obtener el listado de indicadores de los dispositivos:", error);
      }
    };
    fetchData();
  }, []);

  // Obtén el nombre de la pestaña del navegador
  const currentTab = document.title;

  // Determina el nombre de la clase de la tabla basado en la pestaña actual
  const tableClassName = currentTab === "DevNet Home" ? "devices-dash-table-home" : "devices-dash-table";

  const totalDevicesFake =
    indicatorsDevices &&
    indicatorsDevices.numCamerasUp +
    indicatorsDevices.numCamerasDown +
    indicatorsDevices.numApUp +
    indicatorsDevices.numApDown +
    indicatorsDevices.numOthersUp +
    indicatorsDevices.numOthersDown +
    indicatorsDevices.numImpresorasUp +
    indicatorsDevices.numImpresorasDown +
    indicatorsDevices.numMagicUp +
    indicatorsDevices.numMagicDown +
    indicatorsDevices.numBarreraUp +
    indicatorsDevices.numBarreraDown;

  if (spinnerDevices) {
    return (
      <div className="spiner-dashboard-devices-container">
        <PuffLoader color="red" />
        {showApiMessage && <p>{apiMessage}</p>}
      </div>
    );
  }

  return (
    <>
      <table className={tableClassName}>
        <thead>
          <tr>
            <th>DISPOSITIVOS</th>
            <th className="kpi-green">UP</th>
            <th className="kpi-red">DOWN</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CAMARAS</td>
            <td>{indicatorsDevices && indicatorsDevices.numCamerasUp}</td>
            <td>{indicatorsDevices && indicatorsDevices.numCamerasDown}</td>
            <td>{indicatorsDevices && indicatorsDevices.numTotalCameras}</td>
          </tr>
          <tr>
            <td>ACCESS POINTS</td>
            <td>{indicatorsDevices && indicatorsDevices.numApUp}</td>
            <td>{indicatorsDevices && indicatorsDevices.numApDown}</td>
            <td>{indicatorsDevices && indicatorsDevices.numTotalAp}</td>
          </tr>
          <tr>
            <td>IMPRESORAS</td>
            <td>{indicatorsDevices && indicatorsDevices.numImpresorasUp}</td>
            <td>{indicatorsDevices && indicatorsDevices.numImpresorasDown}</td>
            <td>{indicatorsDevices && indicatorsDevices.numTotalImpresoras}</td>
          </tr>
          <tr>
            <td>MAGIC INFO</td>
            <td>{indicatorsDevices && indicatorsDevices.numMagicUp}</td>
            <td>{indicatorsDevices && indicatorsDevices.numMagicDown}</td>
            <td>{indicatorsDevices && indicatorsDevices.numTotalMagic}</td>
          </tr>
          <tr>
            <td>CTRL DE ACCESO</td>
            <td>{indicatorsDevices && indicatorsDevices.numBarreraUp}</td>
            <td>{indicatorsDevices && indicatorsDevices.numBarreraDown}</td>
            <td>{indicatorsDevices && indicatorsDevices.numTotalBarrera}</td>
          </tr>
          <tr>
            <td>OTROS</td>
            <td>{indicatorsDevices && indicatorsDevices.numOthersUp}</td>
            <td>{indicatorsDevices && indicatorsDevices.numOthersDown}</td>
            <td>{indicatorsDevices && indicatorsDevices.numTotalOthers}</td>
          </tr>
          <tr>
            <td>TOTAL</td>
            <td>
              {indicatorsDevices &&
                indicatorsDevices.numCamerasUp +
                  indicatorsDevices.numApUp +
                  indicatorsDevices.numOthersUp +
                  indicatorsDevices.numImpresorasUp}
            </td>
            <td>
              {indicatorsDevices &&
                indicatorsDevices.numCamerasDown +
                  indicatorsDevices.numApDown +
                  indicatorsDevices.numOthersDown +
                  indicatorsDevices.numImpresorasDown}
            </td>
            <td>{totalDevicesFake}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
