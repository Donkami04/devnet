import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { getDataAnilloLorawan } from "../../utils/Api-candelaria/api";
import { Spinner } from "../Spinner/Spinner";
import "./AnilloLorawan.css";

export function AnilloLorawan() {
  const [anilloData, setAnilloData] = useState([]);
  const [loading, setLoading] = useState(true);

  const PRTG_URL = "https://10.224.241.25/device.htm?id=";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataAnilloLorawan();
        setAnilloData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
    const interfaceData = anilloData.find((data) => data.id_device === idInterface);

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
    const interfaceData = anilloData.find((e) => e.id_device === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      return `${interfaceData.sensor} - ${interfaceData.device}: ${interfaceData.status}`;
    }

    // En caso de no encontrar datos o que el estado no incluya "Up" o "Down"
    return "Not Found"; // O cualquier otro valor que desees para indicar un estado no válido
  };

  if (loading) {
    return (
      <>
        <Navbar title={"Lorawan"} />
        {loading && <Spinner />}
      </>
    );
  }

  return (
    <main className="main-container-lorawan">
      <Navbar title={"Lorawan"} />
      <DatetimeModules module={"anillo_lorawan"} name={"Lorawan"} />
      <div className="lorawan-image-container">
        <img className="lorawan-image" src="/topologia-lorawan.webp" alt="" />
        <div className="main-lights-lorawan-container">
          <div className="status-light-anillo-container">
            <a style={{ color: "black" }} href={`${PRTG_URL}15692&tabid=1`} target="_blank">
              {" "}
              <p // Fw IT Adm
                title={statusTitle(15692)}
                className={`status-light-lorawan id15692 ${statusLight(15692)}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a style={{ color: "black" }} href={`${PRTG_URL}15690&tabid=1`} target="_blank">
              <p // Fw IT Conc
                title={statusTitle(15690)}
                className={`status-light-lorawan id15690 ${statusLight(15690)}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a style={{ color: "black" }} href={`${PRTG_URL}15248&tabid=1`} target="_blank">
              <p // candelaria.loraforce.com:3000
                title={statusTitle(15248)}
                className={`status-light-lorawan id15248 ${statusLight(15248)}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <p // 10.224.114.85
              title={statusTitle(5568)}
              className={`status-light-lorawan id5568 ${statusLight(5568)}`}
            >
              G1/7
              <a style={{ color: "black" }} href={`${PRTG_URL}5568&tabid=1`} target="_blank"></a>
            </p>
          </div>

          <div className="status-light-anillo-container">
            <p // 10.224.114.82
              title={statusTitle(10966)}
              className={`status-light-lorawan id10966 ${statusLight(10966)}`}
            >
              <a style={{ color: "black" }} href={`${PRTG_URL}10966&tabid=1`} target="_blank">
                G1/0/12
              </a>
            </p>
          </div>

          <div className="status-light-anillo-container">
            <p // 10.224.114.102
              title={statusTitle(15290)}
              className={`status-light-lorawan id15290 ${statusLight(15290)}`}
            >
              <a style={{ color: "black" }} href={`${PRTG_URL}15290&tabid=1`} target="_blank">
                Fa0/1
              </a>
            </p>
          </div>

          <div className="status-light-anillo-container">
            <p // 10.230.112.31
              title={statusTitle(12311)}
              className={`status-light-lorawan id12311 ${statusLight(12311)}`}
            >
              <a style={{ color: "black" }} href={`${PRTG_URL}12311&tabid=1`} target="_blank">
                Fa1/6
              </a>
            </p>
          </div>

          <div className="status-light-anillo-container">
            <a style={{ color: "black" }} href={`${PRTG_URL}15256&tabid=1`} target="_blank">
              {" "}
              <p // 10.224.14.7
                title={statusTitle(15256)}
                className={`status-light-lorawan id15256 ${statusLight(15256)}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a style={{ color: "black" }} href={`${PRTG_URL}15252&tabid=1`} target="_blank">
              <p // 10.224.14.17
                title={statusTitle(15252)}
                className={`status-light-lorawan id15252 ${statusLight(15252)}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a style={{ color: "black" }} href={`${PRTG_URL}15254&tabid=1`} target="_blank">
              {" "}
              <p // 10.224.14.14
                title={statusTitle(15254)}
                className={`status-light-lorawan id15254 ${statusLight(15254)}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a style={{ color: "black" }} href={`${PRTG_URL}20894&tabid=1`} target="_blank">
              {" "}
              <p // 10.230.1.25
                title={statusTitle(20894)}
                className={`status-light-lorawan id20894 ${statusLight(20894)}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a style={{ color: "black" }} href={`${PRTG_URL}20716&tabid=1`} target="_blank">
              <p // 10.224.116.14
                title={statusTitle(20716)}
                className={`status-light-lorawan id20716 ${statusLight(20716)}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <p // 10.224.116.14
              className={`status-light-lorawan id0000`}
            >
              14
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
