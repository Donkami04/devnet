import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { getMra } from "../../utils/Api-candelaria/api";
import "./Mra.css";

export function Mra() {
  const [anilloData, setAnilloData] = useState([]);
  const PRTG_URL = "https://10.224.241.25/sensor.htm?id=";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMra();
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
    const interfaceData = anilloData.find(
      (data) => data.id_prtg === idInterface
    );

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
      return `${interfaceData.device} - ${interfaceData.sensor}: ${interfaceData.status}`;
    }

    // En caso de no encontrar datos o que el estado no incluya "Up" o "Down"
    return "Not Found"; // O cualquier otro valor que desees para indicar un estado no válido
  };

  return (
    <main className="main-container-anillotetra">
      <Navbar title={"Sistema MRA"} />
      <DatetimeModules module={"mra"} name={"Sistema Mra"} />
      <div className="anillotetra-image-container">
        <img className="anillotetra-image" src="/mra_mapa.webp" alt="" />
        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.112.213
              title={statusTitle(20047)}
              className={`status-light-tetra id20047 ${statusLight(20047)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}20047&tabid=1`}
                target="_blank"
              >
                Gi1/1/4
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.236.17
              title={statusTitle(20054)}
              className={`status-light-tetra id20054 ${statusLight(20054)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}20054&tabid=1`}
                target="_blank"
              >
                G1/1
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.236.17
              title={statusTitle(20053)}
              className={`status-light-tetra id20053 ${statusLight(20053)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}20053&tabid=1`}
                target="_blank"
              >
                Fa1/3
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 172.16.101.10
              title={statusTitle(19756)}
              className={`status-light-tetra id19756 ${statusLight(19756)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}19756&tabid=1`}
                target="_blank"
              >
                Ping
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.236.5
              title={statusTitle(20051)}
              className={`status-light-tetra id20051 ${statusLight(20051)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}20051&tabid=1`}
                target="_blank"
              >
                Gi1/0/16
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.236.5
              title={statusTitle(20052)}
              className={`status-light-tetra id20052 ${statusLight(20052)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}20052&tabid=1`}
                target="_blank"
              >
                Gi1/0/29
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.236.16
              title={statusTitle(20050)}
              className={`status-light-tetra id20050 ${statusLight(20050)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}20050&tabid=1`}
                target="_blank"
              >
                G1/1
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.236.16
              title={statusTitle(20048)}
              className={`status-light-tetra id20048 ${statusLight(20048)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}20048&tabid=1`}
                target="_blank"
              >
                Fa1/2
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.236.16
              title={statusTitle(20049)}
              className={`status-light-tetra id20049 ${statusLight(20049)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}20049&tabid=1`}
                target="_blank"
              >
                Fa1/3
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 172.16.101.11
              title={statusTitle(19927)}
              className={`status-light-tetra id19927 ${statusLight(19927)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}19927&tabid=1`}
                target="_blank"
              >
                Ping
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.236.180
              title={statusTitle(18649)}
              className={`status-light-tetra id18649 ${statusLight(18649)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18649&tabid=1`}
                target="_blank"
              >
                Ping
              </a>
            </p>
          </div>
        </div>

        <div className="main-lights-anillotetra-container">
          <div className="status-light-anillo-container">
            <p // 10.224.4.70
              title={statusTitle(19358)}
              className={`status-light-tetra id19358 ${statusLight(19358)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}19358&tabid=1`}
                target="_blank"
              >
                Ping
              </a>
            </p>
          </div>
        </div>


      </div>
    </main>
  );
}
