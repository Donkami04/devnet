import {
  getDcsCandelariaIndicators,
  getUps,
} from "../../utils/Api-candelaria/api";
import { Navbar } from "../Navbar/Navbar";
import { DevicesDash } from "../Devices/DevicesDash/DevicesDash";
import { DashMesh } from "../Mesh/DashMesh/DashMesh";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashFirewalls } from "../Firewalls/DashFirewalls/DashFirewalls";
import { WanDashboard } from "../Wan/WanDashboard/WanDashboard";
import { useWanDates } from "../../hooks/useWanDates";
import { useVpnCounter } from "../../hooks/useVpnCounter";
import { InfraGeneralDash } from "../InfraGeneral/InfraGeneralDash/InfraGeneralDash";
import PuffLoader from "react-spinners/PuffLoader";
import "./home.css";

export function Home() {
  const [dcsCandeIndicators, setDcsCandeIndicators] = useState();
  const [wanDates, setWanDates] = useState("");
  const [enLineaCount, setEnLineaCount] = useState(0);
  const [usandoBateriaCount, setUsandoBateriaCount] = useState(0);
  const [otroCount, setOtroCount] = useState(0);
  const [changeBatery, setChangeBatery] = useState(0);
  const [numberUps, setNumberUps] = useState(0);
  const { dataVpn1Users, dataVpn2Users, dataVpn3Users } = useVpnCounter();
  const [homeMessage, setHomeMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Estados de spinners
  const [spinnerDcsCandelaria, setSpinnerDcsCandelaria] = useState(true);
  const [spinnerUps, setSpinnerUps] = useState(true);
  const [spinnerMesh, setSpinnerMesh] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const logoutParam = queryParams.get("logout");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dcsCandelaria = await getDcsCandelariaIndicators();
        const dates = useWanDates();
        const allUps = await getUps();

        let enLinea = 0;
        let usandoBateria = 0;
        let otro = 0;
        let countUps = 0;
        let changeBateryCounter = 0;

        allUps &&
          allUps.forEach((ups) => {
            if (ups.status_ups === 2) {
              enLinea++;
            }
            if (ups.status_ups === 3) {
              usandoBateria++;
            } else {
              otro++;
            }
            if (ups.batery === 2) {
              changeBateryCounter++;
            }

            countUps++;
          });

        setDcsCandeIndicators(dcsCandelaria);
        setSpinnerDcsCandelaria(false);
        setSpinnerUps(false);
        setSpinnerMesh(false);
        setWanDates(dates);
        setNumberUps(countUps);
        setEnLineaCount(enLinea);
        setUsandoBateriaCount(usandoBateria);
        setOtroCount(otro);
        setChangeBatery(changeBateryCounter);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    if (logoutParam && !token) {
      setHomeMessage("Has cerrado sesión.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [logoutParam]);

  const overAll = dcsCandeIndicators?.overallKpi?.indicador;
  const disponibilidad = dcsCandeIndicators?.disponibilidad?.indicador;
  const infra_solucion = dcsCandeIndicators?.infraSolucion?.indicador;

  return (
    <>
      <Navbar title={"DEVNET"} />
      <div>
        {showMessage && (
          <div className="home-message-container">
            <p>{homeMessage}</p>
          </div>
        )}
      </div>
      <div className="home-container">
        <section className="system-container">
          <div className="name-system-container">
            <h1>DCS Candelaria</h1>
          </div>
          {spinnerDcsCandelaria ? (
            <div className="spinner-home-container">
              <div className="spinner-container">
                <PuffLoader color="red" />
              </div>
              <div className="link-system-container links-spinner-home">
                <Link
                  to="/monitoreo/candelaria/clients"
                  className="link-system button-clients button-link"
                  style={{ color: "white" }}
                >
                  Clientes
                </Link>
                <Link
                  to="/monitoreo/candelaria/switches"
                  className="link-system button-switches button-link"
                  style={{ color: "white" }}
                >
                  Switches
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="home-kpi-container">
                <table className="home-kpi-table">
                  <tbody>
                    <tr>
                      <td>Overall</td>
                      <td>
                        <span
                          className={overAll < 99.95 ? "kpi-red" : "kpi-green"}
                        >
                          {" "}
                          {overAll}%{" "}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Disponibilidad</td>
                      <td>
                        <span
                          className={
                            disponibilidad < 99.95 ? "kpi-red" : "kpi-green"
                          }
                        >
                          {" "}
                          {disponibilidad}%{" "}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Infraestructura Solución</td>
                      <td>
                        <span
                          className={
                            infra_solucion < 99.95 ? "kpi-red" : "kpi-green"
                          }
                        >
                          {" "}
                          {infra_solucion}%{" "}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="link-system-container">
                <Link
                  to="/monitoreo/candelaria/clients"
                  className="link-system button-clients button-link"
                  style={{ color: "white" }}
                >
                  Clientes
                </Link>
                <Link
                  to="/monitoreo/candelaria/switches"
                  className="link-system button-switches button-link"
                  style={{ color: "white" }}
                >
                  Switches
                </Link>
              </div>
            </>
          )}
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>UPS</h1>
          </div>
          {spinnerUps ? (
            <div className="spinner-home-container">
              <div className="spinner-home-container">
                <PuffLoader color="red" />
              </div>
              <div className="link-system-container links-spinner-home">
                <Link
                  to="/monitoreo/ups"
                  className="link-system button-link"
                  style={{ color: "white" }}
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="home-kpi-container">
                <table className="home-kpi-table ups-table">
                  <tbody>
                    <tr>
                      <td>
                        <p className="light-indicator green-light"></p>En línea
                      </td>
                      <td>{numberUps}</td>
                    </tr>
                    <tr>
                      <td>
                        <p className="light-indicator yellow-light"></p>Usando
                        batería
                      </td>
                      <td>{usandoBateriaCount}</td>
                    </tr>
                    <tr>
                      <td>
                        <p className="light-indicator red-light"></p>Otro
                      </td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>
                        <p className="warning-light" style={{ bottom: "10px" }}>
                          🪫
                        </p>
                        Cambio batería
                      </td>
                      <td>{changeBatery}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="link-system-container">
                <Link
                  to="/monitoreo/ups"
                  className="link-system button-link"
                  style={{ color: "white" }}
                >
                  Ver detalles
                </Link>
              </div>
            </>
          )}
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>VPN</h1>
          </div>

          <div className="home-kpi-container">
            <table className="home-kpi-table home-vpn-table">
              <tbody>
                <tr>
                  <td>Administrativo</td>
                  <td>{dataVpn1Users.number} users</td>
                </tr>
                <tr>
                  <td>Concentradora</td>
                  <td>{dataVpn2Users.number} users</td>
                </tr>
                <tr>
                  <td>Ojos</td>
                  <td>{dataVpn3Users.number} users</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="link-system-container">
            <Link
              to="/monitoreo/vpn"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Ver detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>MESH</h1>
          </div>

          <div className="home-kpi-container">
            <DashMesh />
          </div>
          <div className="link-system-container">
            <Link
              to="/monitoreo/candelaria/mesh"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Ver detalles
            </Link>
          </div>
        </section>
        {/* 
        <section className="system-container">
          <div className="name-system-container">
            <h1>MESH</h1>
          </div>
          {spinnerMesh ? (
            <div className="spinner-home-container">
              <PuffLoader color="red" />
            </div>
          ) : (
            <>
              <div className="home-kpi-container">
                <DashMesh />
              </div>
              <div className="link-system-container">
                <Link
                  to="/monitoreo/candelaria/mesh"
                  className="link-system button-link"
                  style={{ color: "white" }}
                >
                  Ver detalles
                </Link>
              </div>
            </>
          )}
        </section> */}

        <section className="system-container">
          <div className="name-system-container">
            <h1>Dispositivos Candelaria</h1>
          </div>

          <div className="home-kpi-container">
            <DevicesDash />
          </div>
          <div className="link-system-container">
            <Link
              to="/monitoreo/devices"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Ver detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>Canales Internet</h1>
          </div>

          <div className="home-kpi-container">
            <DashFirewalls />
          </div>

          <div className="link-system-container">
            <Link
              to="/monitoreo/firewalls"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Ver detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>WAN</h1>
          </div>

          <div className="home-kpi-container">
            <WanDashboard previousMonthName={wanDates.previousMonthName} />
          </div>

          <div className="link-system-container">
            <Link
              to="/monitoreo/wan"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Ver detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>Infraestructura General</h1>
          </div>

          <div className="home-kpi-container">
            <InfraGeneralDash />
          </div>

          <div className="link-system-container">
            <Link
              to="/monitoreo/infraestrucura-general/map"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Mapa
            </Link>
            <Link
              to="/monitoreo/infraestrucura-general/categorias"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Detalles
            </Link>

            {/* <Link
              to="/monitoreo/infraestrucura-general/details"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Detalles
            </Link> */}
          </div>
        </section>

        {/* <section className="system-container">
          <div className="name-system-container">
            <h1>DCS PAC</h1>
          </div>

          <div className="link-system-container">
            <Link
              to="/monitoreo/pac/clientes"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Detalles
            </Link>
          </div>
        </section>

        <section className="system-container">
          <div className="name-system-container">
            <h1>DCS OJOS</h1>
          </div>

          <div className="link-system-container">
            <Link
              to="/monitoreo/ojos/clientes"
              className="link-system button-link"
              style={{ color: "white" }}
            >
              Detalles
            </Link>
          </div>
        </section> */}
      </div>
    </>
  );
}
