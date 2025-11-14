import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { getDataAnilloTetra } from "../../utils/Api-candelaria/api";
import "./AnilloTetra.css";

export function AnilloTetra() {
  const [anilloData, setAnilloData] = useState([]);
  const PRTG_URL = "https://10.224.241.25/sensor.htm?id=";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataAnilloTetra();
        setAnilloData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const statusLight = (idInterface) => {
    // Verifica si hay datos en anilloData
    if (anilloData.length === 0) {
      return ""; // O cualquier otro valor que desees para indicar que no hay datos disponibles
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find((data) => data.id_prtg === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      if (interfaceData.status.toLowerCase().includes("up")) {
        return "anillo-green";
      }
      if (interfaceData.status.toLowerCase().includes("down")) {
        return "anillo-red";
      }
      if (interfaceData.status.toLowerCase().includes("unusual")) {
        return "anillo-orange";
      }
      if (interfaceData.status.toLowerCase().includes("paused")) {
        return "anillo-blue";
      }
    }

    return "anillo-white";
  };

  const statusTitle = (idInterface) => {
    // Verifica si hay datos en anilloData
    if (anilloData.length === 0) {
      return ""; // O cualquier otro valor que desees para indicar que no hay datos disponibles
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find((e) => e.id_prtg === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      return `${interfaceData.sensor}: ${interfaceData.status}`;
    }

    // En caso de no encontrar datos o que el estado no incluya "Up" o "Down"
    return "Not Found"; // O cualquier otro valor que desees para indicar un estado no válido
  };

  return (
    <main className="main-container-anillotetra">
      <Navbar title={"Sistema Tetra"} />
      <DatetimeModules module={"anillo_tetra"} name={"Sistema Tetra"} />
      <div className="anillotetra-image-container">
        <img className="anillotetra-image" src="/mapa_tetra_v2.webp" alt="" />
        <div className="main-lights-anillotetra-container">

          {/* Taller electronico */}
          <div className="status-light-anillo-container">
            <p title={statusTitle(20128)} className={`status-light-tetra id20128 ${statusLight(20128)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20128&tabid=1`} target="_blank">
                Gi1/0/15
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(20129)} className={`status-light-tetra id20129 ${statusLight(20129)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20129&tabid=1`} target="_blank">
                Gi1/0/16
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(20130)} className={`status-light-tetra id20130 ${statusLight(20130)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20130&tabid=1`} target="_blank">
                Gi1/0/17
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19115)} className={`status-light-tetra id19115 ${statusLight(19115)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19115&tabid=1`} target="_blank">
                Gi1/0/22
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19116)} className={`status-light-tetra id19116 ${statusLight(19116)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19116&tabid=1`} target="_blank">
                Gi1/0/25
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19117)} className={`status-light-tetra id19117 ${statusLight(19117)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19117&tabid=1`} target="_blank">
                Gi1/0/26
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19118)} className={`status-light-tetra id19118 ${statusLight(19118)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19118&tabid=1`} target="_blank">
                Gi1/0/27
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19119)} className={`status-light-tetra id19119 ${statusLight(19119)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19119&tabid=1`} target="_blank">
                Gi1/0/28
              </a>
            </p>
          </div>

          {/* Bronce */}
          <div className="status-light-anillo-container">
            <p title={statusTitle(19120)} className={`status-light-tetra id19120 ${statusLight(19120)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19120&tabid=1`} target="_blank">
                Gi0/1
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19124)} className={`status-light-tetra id19124 ${statusLight(19124)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19124&tabid=1`} target="_blank">
                Gi0/12
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19121)} className={`status-light-tetra id19121 ${statusLight(19121)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19121&tabid=1`} target="_blank">
                Gi0/2
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19122)} className={`status-light-tetra id19122 ${statusLight(19122)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19122&tabid=1`} target="_blank">
                Gi0/7
              </a>
            </p>
          </div>
          
          {/* Buitre */}
          <div className="status-light-anillo-container">
            <p title={statusTitle(19125)} className={`status-light-tetra id19125 ${statusLight(19125)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19125&tabid=1`} target="_blank">
                Gi0/3
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19123)} className={`status-light-tetra id19123 ${statusLight(19123)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19123&tabid=1`} target="_blank">
                Gi0/7
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(19124)} className={`status-light-tetra id19124 ${statusLight(19124)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}19124&tabid=1`} target="_blank">
                Gi0/12
              </a>
            </p>
          </div>

          {/* Core OT CONCE */}
          <div className="status-light-anillo-container">
            <p title={statusTitle(17511)} className={`status-light-tetra id17511 ${statusLight(17511)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17511&tabid=1`} target="_blank">
                Te1/6
              </a>
            </p>
          </div>

          {/* Core OT ADM */}
          <div className="status-light-anillo-container">
            <p title={statusTitle(17469)} className={`status-light-tetra id17469 ${statusLight(17469)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17469&tabid=1`} target="_blank">
                Te1/15
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(20124)} className={`status-light-tetra id20124 ${statusLight(20124)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20124&tabid=1`} target="_blank">
                Te1/9
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(17470)} className={`status-light-tetra id17470 ${statusLight(17470)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17470&tabid=1`} target="_blank">
                Te2/1
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(17471)} className={`status-light-tetra id17471 ${statusLight(17471)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17471&tabid=1`} target="_blank">
                Te2/2
              </a>
            </p>
          </div>

          {/* Nexus OT */}
          <div className="status-light-anillo-container">
            <p title={statusTitle(20131)} className={`status-light-tetra id20131 ${statusLight(20131)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20131&tabid=1`} target="_blank">
                Eth1/11
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(20132)} className={`status-light-tetra id20132 ${statusLight(20132)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20132&tabid=1`} target="_blank">
                Eth1/14
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(20133)} className={`status-light-tetra id20133 ${statusLight(20133)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}20133&tabid=1`} target="_blank">
                Eth1/17
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(17525)} className={`status-light-tetra id17525 ${statusLight(17525)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17525&tabid=1`} target="_blank">
                E1/47
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p title={statusTitle(17526)} className={`status-light-tetra id17526 ${statusLight(17526)}`}>
              <a style={{ color: "black" }} href={`${PRTG_URL}17526&tabid=1`} target="_blank">
                E1/48
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
