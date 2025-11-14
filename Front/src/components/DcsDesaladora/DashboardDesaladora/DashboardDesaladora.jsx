import { useEffect, useState } from "react";
import { SectionDash } from "../../CandelariaClients/SectionDash/SectionDash";
import { getDcsDesaladoraIndicators } from "../../../utils/Api-candelaria/api";
import PuffLoader from "react-spinners/PuffLoader";
import "./dashboard.css";

export function DashboardDesaladora() {
  const [indicators, setIndicators] = useState();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const dataIndicators = async () => {
      try {
        const allIndicators = await getDcsDesaladoraIndicators();
        setIndicators(allIndicators);
        setShowSpinner(false);
      } catch (error) {
        console.error("Error al obtener los indicadores del sistema", error);
        return error;
      }
    };
    dataIndicators();
  }, []);

  const overallIndicator = indicators?.overallKpi?.indicador;

  const disponibilidadIndicator = indicators?.disponibilidad?.indicador;
  const clients = indicators?.disponibilidad?.clientsStatus;

  const infraSolucionIndicator = indicators?.infraSolucion?.indicador;
  const switches = indicators?.infraSolucion?.switchesStatus;

  if (showSpinner) {
    return (
      <div className="spinner-dash-container">
        <PuffLoader color="red" />
      </div>
    );
  }

  return (
    <div className="main-dashboard-container">
      <p className="dashboard-title">Dashboard</p>

      <div className="top-section">
        {indicators && (
          <SectionDash>
            <h2>
              Overall:{" "}
              <span
                className={overallIndicator < 99.95 ? "kpi-red" : "kpi-green"}
              >
                {overallIndicator}%
              </span>
            </h2>
            <table className="kpi-table overall">
              <tbody>
                {Object.entries(indicators.overallKpi).map(([key, value]) => {
                  if (key !== "indicador") {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}%</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </SectionDash>
        )}
        <SectionDash>
          <h2>
            Disponibilidad:{" "}
            <span
              className={
                disponibilidadIndicator < 99.95 ? "kpi-red" : "kpi-green"
              }
            >
              {disponibilidadIndicator && disponibilidadIndicator}%
            </span>
          </h2>
          <table className="kpi-table">
            <tbody>
              <tr>
                <td>CSP UP</td>
                <td
                  className={
                    clients && clients.csp_up === 0 ? "kpi-red" : "kpi-green"
                  }
                >
                  {clients && clients.csp_up}
                </td>
                <td>CSP DOWN</td>
                <td
                  className={
                    clients && clients.csp_down === 0 ? "kpi-green" : "kpi-red"
                  }
                >
                  {clients && clients.csp_down}
                </td>
                <td>CSP PAUSED</td>
                <td
                  className={
                    clients && clients.csp_paused === 0
                      ? "kpi-green"
                      : "kpi-red"
                  }
                >
                  {clients && clients.csp_paused}
                </td>
              </tr>
              <tr>
                <td>CSS UP</td>
                <td
                  className={
                    clients && clients.css_up === 0 ? "kpi-red" : "kpi-green"
                  }
                >
                  {clients && clients.css_up}
                </td>
                <td>CSS DOWN</td>
                <td
                  className={
                    clients && clients.css_down === 0 ? "kpi-green" : "kpi-red"
                  }
                >
                  {clients && clients.css_down}
                </td>
                <td>CSS PAUSED</td>
                <td
                  className={
                    clients && clients.css_paused === 0
                      ? "kpi-green"
                      : "kpi-red"
                  }
                >
                  {clients && clients.css_paused}
                </td>
              </tr>
              <tr>
                <td>CNP UP</td>
                <td
                  className={
                    clients && clients.cnp_up === 0 ? "kpi-red" : "kpi-green"
                  }
                >
                  {clients && clients.cnp_up}
                </td>
                <td>CNP DOWN</td>
                <td
                  className={
                    clients && clients.cnp_down === 0 ? "kpi-green" : "kpi-red"
                  }
                >
                  {clients && clients.cnp_down}
                </td>
                <td>CNP PAUSED</td>
                <td
                  className={
                    clients && clients.cnp_paused === 0
                      ? "kpi-green"
                      : "kpi-red"
                  }
                >
                  {clients && clients.cnp_paused}
                </td>
              </tr>
              <tr>
                <td>CNS UP</td>
                <td
                  className={
                    clients && clients.cns_up === 0 ? "kpi-red" : "kpi-green"
                  }
                >
                  {clients && clients.cns_up}
                </td>
                <td>CNS DOWN</td>
                <td
                  className={
                    clients && clients.cns_down === 0 ? "kpi-green" : "kpi-red"
                  }
                >
                  {clients && clients.cns_down}
                </td>
                <td>CNS PAUSED</td>
                <td
                  className={
                    clients && clients.cns_paused === 0
                      ? "kpi-green"
                      : "kpi-red"
                  }
                >
                  {clients && clients.cns_paused}
                </td>
              </tr>
              <tr>
                <td>HSE UP</td>
                <td
                  className={
                    clients && clients.hse_up === 0 ? "kpi-red" : "kpi-green"
                  }
                >
                  {clients && clients.hse_up}
                </td>
                <td>HSE DOWN</td>
                <td
                  className={
                    clients && clients.hse_down === 0 ? "kpi-green" : "kpi-red"
                  }
                >
                  {clients && clients.hse_down}
                </td>
                <td>HSE PAUSED</td>
                <td
                  className={
                    clients && clients.hse_paused === 0
                      ? "kpi-green"
                      : "kpi-red"
                  }
                >
                  {clients && clients.hse_paused}
                </td>
              </tr>
              <tr>
                <td>CNPB UP</td>
                <td
                  className={
                    clients && clients.cnpb_up === 0 ? "kpi-red" : "kpi-green"
                  }
                >
                  {clients && clients.cnpb_up}
                </td>
                <td>CNPB DOWN</td>
                <td
                  className={
                    clients && clients.cnpb_down === 0 ? "kpi-green" : "kpi-red"
                  }
                >
                  {clients && clients.cnpb_down}
                </td>
                <td>CNPB PAUSED</td>
                <td
                  className={
                    clients && clients.cnpb_paused === 0
                      ? "kpi-green"
                      : "kpi-red"
                  }
                >
                  {clients && clients.cnpb_paused}
                </td>
              </tr>
              <tr>
                <td>CNSB UP</td>
                <td
                  className={
                    clients && clients.cnsb_up === 0 ? "kpi-red" : "kpi-green"
                  }
                >
                  {clients && clients.cnsb_up}
                </td>
                <td>CNSB DOWN</td>
                <td
                  className={
                    clients && clients.cnsb_down === 0 ? "kpi-green" : "kpi-red"
                  }
                >
                  {clients && clients.cnsb_down}
                </td>
                <td>CNSB PAUSED</td>
                <td
                  className={
                    clients && clients.cnsb_paused === 0
                      ? "kpi-green"
                      : "kpi-red"
                  }
                >
                  {clients && clients.cnsb_paused}
                </td>
              </tr>
            </tbody>
          </table>
        </SectionDash>
      </div>

      {/* <div className="bottom-section">
        <SectionDash>
          <h2>
            Infraestructura Solución: <span className={infraSolucionIndicator < 99.95 ? 'kpi-red' : 'kpi-green'}>{infraSolucionIndicator && infraSolucionIndicator}%</span>
          </h2>
          <table className="kpi-table">
            <tbody>
            <tr>
                <td>CSP UP</td>
                <td className={switches && switches.csp_up === 0 ? 'kpi-red' : 'kpi-green'}>{switches && switches.csp_up}</td>
                <td>CSP DOWN</td>
                <td className={switches && switches.csp_down === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.csp_down}</td>
                <td>CSP PAUSED</td>
                <td className={switches && switches.csp_paused === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.csp_paused}</td>
              </tr>
              <tr>
                <td>CSS UP</td>
                <td className={switches && switches.css_up === 0 ? 'kpi-red' : 'kpi-green'}>{switches && switches.css_up}</td>
                <td>CSS DOWN</td>
                <td className={switches && switches.css_down === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.css_down}</td>
                <td>CSS PAUSED</td>
                <td className={switches && switches.css_paused === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.css_paused}</td>
              </tr>
              <tr>
                <td>CNP UP</td>
                <td className={switches && switches.cnp_up === 0 ? 'kpi-red' : 'kpi-green'}>{switches && switches.cnp_up}</td>
                <td>CNP DOWN</td>
                <td className={switches && switches.cnp_down === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.cnp_down}</td>
                <td>CNP PAUSED</td>
                <td className={switches && switches.cnp_paused === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.cnp_paused}</td>
              </tr>
              <tr>
                <td>CNS UP</td>
                <td className={switches && switches.cns_up === 0 ? 'kpi-red' : 'kpi-green'}>{switches && switches.cns_up}</td>
                <td>CNS DOWN</td>
                <td className={switches && switches.cns_down === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.cns_down}</td>
                <td>CNS PAUSED</td>
                <td className={switches && switches.cns_paused === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.cns_paused}</td>
              </tr>
              <tr>
                <td>HSE UP</td>
                <td className={switches && switches.hse_up === 0 ? 'kpi-red' : 'kpi-green'}>{switches && switches.hse_up}</td>
                <td>HSE DOWN</td>
                <td className={switches && switches.hse_down === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.hse_down}</td>
                <td>HSE PAUSED</td>
                <td className={switches && switches.hse_paused === 0 ? 'kpi-green' : 'kpi-red'}>{switches && switches.hse_paused}</td>
              </tr>
            </tbody>
          </table>
        </SectionDash>
      </div> */}
    </div>
  );
}
