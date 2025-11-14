import { useState, useEffect } from "react";
import { getWanIndicators } from "../../../utils/Api-candelaria/api";
import PuffLoader from "react-spinners/PuffLoader";
import "./wandashboard.css";

export function WanDashboard({ previousMonthName }) {
  const [wanKpi, setWanKpi] = useState({});
  const [spinnerWan, setSpinnerWan] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kpi = await getWanIndicators();
        setWanKpi(kpi.kpiWan);
        setSpinnerWan(false);
      } catch (error) {
        console.error("Error al obtener el listado de firewalls:", error);
        return error;
      }
    };
    fetchData();
  }, []);

  const kpiRemoteSites = wanKpi.kpiOtherWans || "Cargando...";
  const kpiCandelaria = wanKpi.kpiAdminWans || "Cargando...";

  const currentTab = document.title;
  const containerClassName =
    currentTab === "DevNet Home"
      ? "wan-kpi-container-home"
      : "wan-kpi-container";
  const tableClassName =
    currentTab === "DevNet Home"
      ? "table-dashboard-wan-home"
      : "table-dashboard-wan";

  if (spinnerWan) {
    return (
      <div>
        <PuffLoader color="red" />
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <table className={tableClassName}>
        <tbody>
          <tr>
            <td className="left-td-wan-dash">
              KPI {previousMonthName} Sitios remotos:
            </td>
            <td
              className={
                kpiRemoteSites >= 99.85
                  ? "kpi-green td-wan-dash"
                  : "kpi-red td-wan-dash"
              }
            >
              {kpiRemoteSites}%
            </td>
          </tr>
          <tr>
            <td className="left-td-wan-dash">
              KPI {previousMonthName} Candelaria:
            </td>
            <td
              className={
                kpiCandelaria >= 99.85
                  ? "kpi-green td-wan-dash"
                  : "kpi-red td-wan-dash"
              }
            >
              {kpiCandelaria}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
