import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DevicesDash } from "./DevicesDash/DevicesDash";
import { getDevices } from "../../utils/Api-candelaria/api";
import { formatDatePrtg, diffDates} from "../../hooks/formatDateDevice";
import {
  PRTG_URL,
  CISCO_URL_IT,
  CISCO_URL,
} from "../../utils/Api-candelaria/api";
import { Spinner } from "../Spinner/Spinner";
import { MdOutlineInfo } from "react-icons/md";
import { useDeviceIcons } from "../../hooks/useDeviceIcons";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import "./devices.css";

export function Devices() {
  const [devices, setDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDownPaused, setFilterDownPaused] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showColorMeans, setShowColorMeans] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [filterNotFound, setFilterNotFound] = useState(false);
  const [last24HoursCheck, setLast24HoursCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicesList = await getDevices();
        setDevices(devicesList.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el listado de Devices:", error);
        return error;
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (e) => {
    setFilterDownPaused(e.target.checked);
  };

  // Utilizado para filtrar por el atributo status_cisco_device === "Not Found"
  const handleNotFoundChange = (e) => {
    setFilterNotFound(e.target.checked);
  };

  const handleLast24Hours = (e) => {
    setLast24HoursCheck(e.target.checked);
  };

  const filteredDevices = devices.filter((device) => {
    const searchValues = Object.values(device)
      .map((value) => {
        // Verificar si value es null
        if (value === null) {
          return ""; // O manejar el caso de valor nulo de otra manera
        }
        return value.toString().toLowerCase();
      })
      .join(" ");
    const hasDownPaused = searchValues.includes("down");
    return !filterDownPaused || (filterDownPaused && hasDownPaused);
  });

  const downDevsLast24hoursFunct = () => {
    try {
      const mutableArray = [...devices];
      const last24hDown = mutableArray.map((device) => {
        if (device.prtg_lastdown !== "-" && device.prtg_lastdown !== "Not Found") {
          const formatedDate = formatDatePrtg(device.prtg_lastdown);
          const isLessThan24h = diffDates(formatedDate);
          if (isLessThan24h) {
            return device;
          }
        }
        return null;
      })
      .filter((device) => device !== null);
    } catch (error) {
      console.error(error)
    }

  }

  const filteredSearchDevices = filteredDevices.filter(
    (device) =>
      Object.values(device)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (!filterNotFound ||
        (device.cisco_status_device === "Not Found" &&
          device.cisco_device_ip !== "Not Found"))
  );

  const colorTitle = (status) => {
    if (status.includes("Up")) {
      return "IP Cisco en PRTG: Up";
    }
    if (status.includes("Down")) {
      return "IP Cisco en PRTG: Down";
    }
    if (status.includes("Paused")) {
      return "IP Cisco en PRTG: Pausado";
    }
    if (status.includes("Not Found")) {
      return "IP Cisco en PRTG: Not Found";
    }
  };

  const toggleContent = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return (
      <div>
        <Navbar title={"Dispositivos"} />
        <Spinner />
      </div>
    );
  }

  const renderTableBody = () => {
    if (filteredSearchDevices.length === 0) {
      return (
        <tr>
          <td className="no-match" colSpan="14" style={{ fontSize: "13px" }}>
            No hay elementos
          </td>
        </tr>
      );
    }

    return filteredSearchDevices.map((device) => (
      <tr key={device.id}>
        <td>{device?.host || "Actualizando..."}</td>
        <td>{device?.type || "Actualizando..."}</td>
        <td>{device?.site || "Actualizando..."}</td>
        <td>{device?.dpto || "Actualizando..."}</td>
        <td>{device?.prtg_name_device || "Actualizando..."}</td>
        <td>{device?.prtg_sensorname || "Actualizando..."}</td>
        <td>
        <a href={`${PRTG_URL}${device?.prtg_id || ""}`} target="_blank">
            {device?.prtg_status || "Actualizando..."}
          </a>
        </td>
        <td>{device?.prtg_lastup || "Actualizando..."}</td>
        <td>{device?.prtg_lastdown || "Actualizando..."}</td>
        <td>
          {device?.data_backup === 1 ? (
            <p
              style={{ cursor: "help" }}
              className="warning-icon"
              title={
                "Data Not Found, información extraida de registros antiguos."
              }
            >
              ⚠️ {device?.cisco_device_ip || "Actualizando..."}
            </p>
          ) : (
            <p>{device?.cisco_device_ip || "Actualizando..."}</p>
          )}
        </td>
        <td
          className={`${
            device?.cisco_status_device?.includes("Up")
              ? "kpi-green"
              : device?.cisco_status_device?.includes("Down")
              ? "kpi-red"
              : device?.cisco_status_device?.includes("Paused")
              ? "kpi-blue"
              : device?.cisco_status_device?.includes("Not Found") &&
                device?.cisco_device_ip !== "Not Found"
              ? "kpi-grey"
              : ""
          } td-name-cisco`}
        >
          {device?.data_backup === 1 ? (
            <div>
              <p
                className="warning-icon"
                title="Data Not Found, información extraida de registros antiguos."
              >
                ⚠️
              </p>{" "}
              <p
                style={{ cursor: "help" }}
                title={colorTitle(device?.cisco_status_device || "")}
              >
                {device?.cisco_device_name || "Actualizando..."}
              </p>
            </div>
          ) : (
            <div
              style={{ cursor: "help" }}
              title={colorTitle(device?.cisco_status_device || "")}
            >
              {device?.cisco_device_name || "Actualizando..."}
            </div>
          )}
        </td>
        <td>
          <a
            href={`${device?.red === "OT" ? CISCO_URL : CISCO_URL_IT}${
              device?.host || ""
            }&forceLoad=true`}
            target="_blank"
          >
            {device?.data_backup === 1 ? (
              <p
                className="warning-icon"
                title="Data Not Found, información extraida de registros antiguos."
              >
                ⚠️ {device?.cisco_port || "Actualizando..."}
              </p>
            ) : (
              device?.cisco_port || "Actualizando..."
            )}
          </a>
        </td>
        <td>
          {device?.data_backup === 1 ? (
            <p
              className="warning-icon"
              title="Data Not Found, información extraida de registros antiguos."
            >
              ⚠️ {device?.cisco_status || "Actualizando..."}
            </p>
          ) : (
            device?.cisco_status || "Actualizando..."
          )}
        </td>
        <td>{useDeviceIcons(device) || "Actualizando..."}</td>
      </tr>
    ));
  };

  const renderRowCount = () => {
    const rowCount = filteredSearchDevices.length;
    return (
      <div className="row-count-devices">Total de elementos: {rowCount}</div>
    );
  };

  return (
    <>
      <Navbar title={"Dispositivos"} />
      <DatetimeModules module={"devices"} name={"Dispositivos Cande"} />
      <DevicesDash />

      <div className="filtros-devices-container">
        <div className="filtros-checkbox-container">
          <input
            className="filtro filtro-devices"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar..."
          />

          <label style={{ marginRight: "10px" }}>
            <input
              className="checkbox-filter"
              type="checkbox"
              checked={filterDownPaused}
              onChange={handleCheckboxChange}
            />
            Down
          </label>

          <label style={{ marginRight: "10px" }}>
            <input
              className="checkbox-filter"
              type="checkbox"
              checked={filterNotFound}
              onChange={handleNotFoundChange}
            />
            PRTG Estado Cisco IP: Not Found
          </label>

          <label style={{ marginRight: "10px" }}>
            <input
              className="checkbox-filter"
              type="checkbox"
              checked={last24HoursCheck}
              onChange={handleLast24Hours}
            />
            Down Last 24h
          </label>
        </div>


        <button 
        title={"Descargar reporte csv de camaras"}
        className="csv-button">
          <BsFillCameraVideoFill
  
                  fontSize="1.3rem"
                  color="white"
                />
          <div className="button-text">
          Data<br/>Camaras
          </div>
          <MdOutlineDownloadForOffline
            fontSize="1.6rem"
            color="white"
           />
        </button>
      </div>

      <div className="devices-container">
        <table>
          <thead>
            <tr>
              <th>HOST</th>
              <th>TYPE</th>
              <th>SITE</th>
              <th>DPTO</th>
              <th>PRTG DEVICE</th>
              <th>PRTG SENSOR</th>
              <th>PRTG STATUS</th>
              <th>PRTG LASTUP</th>
              <th>PRTG LASTDOWN</th>
              <th>CISCO IP</th>
              <th>CISCO SW NAME</th>
              <th>CISCO PUERTO</th>
              <th>CISCO ESTADO</th>
              <th title="Iconos de Información">
                <MdOutlineInfo size={"1.1rem"} style={{ cursor: "help" }} />
              </th>
            </tr>
          </thead>
          <tbody className="data-table-devices">{renderTableBody()}</tbody>
        </table>
      </div>
      {renderRowCount()}
    </>
  );
}