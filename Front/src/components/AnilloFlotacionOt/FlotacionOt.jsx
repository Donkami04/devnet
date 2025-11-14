import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { getDataFlotacionOt } from "../../utils/Api-candelaria/api";
import { IoMdBatteryCharging } from "react-icons/io";
import "./FlotacionOt.css";

export function FlotacionOt() {
  const [anilloData, setAnilloData] = useState([]);
  const PRTG_URL = "https://10.224.241.25/sensor.htm?id=";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataFlotacionOt();

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
      return "";
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find(
      (data) => data.device_id === idInterface
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
    const interfaceData = anilloData.find((e) => e.device_id === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      return `${interfaceData.sensor} - ${interfaceData.name}: ${interfaceData.status}`;
    }

    // En caso de no encontrar datos o que el estado no incluya "Up" o "Down"
    return "Not Found"; // O cualquier otro valor que desees para indicar un estado no válido
  };

  return (
    <main className="main-container-anilloug">
      <Navbar title={"Red OT Flotación"} />
      <DatetimeModules module={"flotacion_ot"} name={"Red Flotacion OT"} />
      <div className="anilloug-image-container">
        <img className="anilloug-image" src="/flotacion_ot.webp" alt="" />
        <div className="main-lights-anilloug-container">
          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19874&tabid=1`}
              target="_blank"
            >
              <p // 10.224.240.26
                title={statusTitle("19874")}
                className={`status-light-ping-flotacionot id19874 ${statusLight(
                  "19874"
                )}`}
              ></p>
            </a>
          </div>
          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19882&tabid=1`}
              target="_blank"
            >
              <IoMdBatteryCharging // 10.224.240.26
                color="white"
                size={"2.5rem"}
                title={statusTitle("19882")}
                className={`status-light-ping-flotacionot id19882-battery ${statusLight(
                  "19882"
                )}`}
              />
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}16597&tabid=1`}
              target="_blank"
            >
              <p // 10.224.240.32
                title={statusTitle("16597")}
                className={`status-light-ping-flotacionot id16597 ${statusLight(
                  "16597"
                )}`}
              ></p>
            </a>
          </div>
          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}16604&tabid=1`}
              target="_blank"
            >
              <IoMdBatteryCharging // 10.224.240.32
                color="white"
                size={"2.5rem"}
                title={statusTitle("16604")}
                className={`status-light-ping-flotacionot id16604-battery ${statusLight(
                  "16604"
                )}`}
              />
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18725&tabid=1`}
              target="_blank"
            >
              <p // 10.224.240.32
                title={statusTitle("18725")}
                className={`status-light-ping-flotacionot id18725 ${statusLight(
                  "18725"
                )}`}
              ></p>
            </a>
          </div>
          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18736&tabid=1`}
              target="_blank"
            >
              <IoMdBatteryCharging // 10.224.240.32
                color="white"
                size={"2.5rem"}
                title={statusTitle("18736")}
                className={`status-light-ping-flotacionot id18736-battery ${statusLight(
                  "18736"
                )}`}
              />
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}16477&tabid=1`}
              target="_blank"
            >
              <p // 10.224.240.30
                title={statusTitle("16477")}
                className={`status-light-ping-flotacionot id16477 ${statusLight(
                  "16477"
                )}`}
              ></p>
            </a>
          </div>
          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}16484&tabid=1`}
              target="_blank"
            >
              <IoMdBatteryCharging // 10.224.240.30
                color="white"
                size={"2.5rem"}
                title={statusTitle("16484")}
                className={`status-light-ping-flotacionot id16484-battery ${statusLight(
                  "16484"
                )}`}
              />
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18075&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.21
                title={statusTitle("18075")}
                className={`status-light-ping-flotacionot id18075 ${statusLight(
                  "18075"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17906&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.22
                title={statusTitle("17906")}
                className={`status-light-ping-flotacionot id17906 ${statusLight(
                  "17906"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18077&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.23
                title={statusTitle("18077")}
                className={`status-light-ping-flotacionot id18077 ${statusLight(
                  "18077"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18063&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.24
                title={statusTitle("18063")}
                className={`status-light-ping-flotacionot id18063 ${statusLight(
                  "18063"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18065&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.25
                title={statusTitle("18065")}
                className={`status-light-ping-flotacionot id18065 ${statusLight(
                  "18065"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17908&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.26
                title={statusTitle("17908")}
                className={`status-light-ping-flotacionot id17908 ${statusLight(
                  "17908"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18061&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.27
                title={statusTitle("18061")}
                className={`status-light-ping-flotacionot id18061 ${statusLight(
                  "18061"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18067&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.28
                title={statusTitle("18067")}
                className={`status-light-ping-flotacionot id18067 ${statusLight(
                  "18067"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18069&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.29
                title={statusTitle("18069")}
                className={`status-light-ping-flotacionot id18069 ${statusLight(
                  "18069"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18071&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.30
                title={statusTitle("18071")}
                className={`status-light-ping-flotacionot id18071 ${statusLight(
                  "18071"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18073&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.31
                title={statusTitle("18073")}
                className={`status-light-ping-flotacionot id18073 ${statusLight(
                  "18073"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18081&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.13
                title={statusTitle("18081")}
                className={`status-light-ping-flotacionot id18081 ${statusLight(
                  "18081"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18083&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.14
                title={statusTitle("18083")}
                className={`status-light-ping-flotacionot id18083 ${statusLight(
                  "18083"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18085&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.15
                title={statusTitle("18085")}
                className={`status-light-ping-flotacionot id18085 ${statusLight(
                  "18085"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18087&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.16
                title={statusTitle("18087")}
                className={`status-light-ping-flotacionot id18087 ${statusLight(
                  "18087"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18089&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.17
                title={statusTitle("18089")}
                className={`status-light-ping-flotacionot id18089 ${statusLight(
                  "18089"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18091&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.18
                title={statusTitle("18091")}
                className={`status-light-ping-flotacionot id18091 ${statusLight(
                  "18091"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18093&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.19
                title={statusTitle("18093")}
                className={`status-light-ping-flotacionot id18093 ${statusLight(
                  "18093"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18095&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.20
                title={statusTitle("18095")}
                className={`status-light-ping-flotacionot id18095 ${statusLight(
                  "18095"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18079&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.10
                title={statusTitle("18079")}
                className={`status-light-ping-flotacionot id18079 ${statusLight(
                  "18079"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17902&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.11
                title={statusTitle("17902")}
                className={`status-light-ping-flotacionot id17902 ${statusLight(
                  "17902"
                )}`}
              ></p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17904&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("17904")}
                className={`status-light-ping-flotacionot id17904 ${statusLight(
                  "17904"
                )}`}
              ></p>
            </a>
          </div>

          {/* Interfaces */}
          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19853&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19853")}
                className={`status-light-interface-flotacionot id19853 ${statusLight(
                  "19853"
                )}`}
              >
                Gi1/1
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19854&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19854")}
                className={`status-light-interface-flotacionot id19854 ${statusLight(
                  "19854"
                )}`}
              >
                Gi1/2
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19855&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19855")}
                className={`status-light-interface-flotacionot id19855 ${statusLight(
                  "19855"
                )}`}
              >
                Gi0/11
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19856&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19856")}
                className={`status-light-interface-flotacionot id19856 ${statusLight(
                  "19856"
                )}`}
              >
                Gi1/12
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19858&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19858")}
                className={`status-light-interface-flotacionot id19858 ${statusLight(
                  "19858"
                )}`}
              >
                Gi0/2
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19857&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19857")}
                className={`status-light-interface-flotacionot id19857 ${statusLight(
                  "19857"
                )}`}
              >
                Gi0/1
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19859&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19859")}
                className={`status-light-interface-flotacionot id19859 ${statusLight(
                  "19859"
                )}`}
              >
                Gi1/1
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19861&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19861")}
                className={`status-light-interface-flotacionot id19861 ${statusLight(
                  "19861"
                )}`}
              >
                Gig1/1/1
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19860&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19860")}
                className={`status-light-interface-flotacionot id19860 ${statusLight(
                  "19860"
                )}`}
              >
                Gig1/0/8
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17502&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("17502")}
                className={`status-light-interface-flotacionot id17502 ${statusLight(
                  "17502"
                )}`}
              >
                Ten2/4
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17498&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("17498")}
                className={`status-light-interface-flotacionot id17498 ${statusLight(
                  "17498"
                )}`}
              >
                Ten2/1
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17499&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("17499")}
                className={`status-light-interface-flotacionot id17499 ${statusLight(
                  "17499"
                )}`}
              >
                Ten2/2
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19863&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19863")}
                className={`status-light-interface-flotacionot id19863 ${statusLight(
                  "19863"
                )}`}
              >
                Eth1/47
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19864&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19864")}
                className={`status-light-interface-flotacionot id19864 ${statusLight(
                  "19864"
                )}`}
              >
                Eth1/48
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}19862&tabid=1`}
              target="_blank"
            >
              <p // 10.225.8.12
                title={statusTitle("19862")}
                className={`status-light-interface-flotacionot id19862 ${statusLight(
                  "19862"
                )}`}
              >
                Eth1/8
              </p>
            </a>
          </div>

          <div className="status-light-anillo-container">
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}16419&tabid=1`}
              target="_blank"
            >
              <p // 10.224.240.26
                title={statusTitle("16419")}
                className={`status-light-ping-flotacionot id16419 ${statusLight(
                  "16419"
                )}`}
              ></p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
