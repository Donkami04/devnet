import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDataPrtgGroupsUpDown,
  getDataInfGen,
} from "../../../utils/Api-candelaria/api";
import { Navbar } from "../../Navbar/Navbar";
import { useDataInfGen } from "../../../hooks/useDataInfGen";
import { Spinner } from "../../Spinner/Spinner";
import { Link } from "react-router-dom";
import { TableGroupPrtg } from "../TableGroupPrtg/TableGroupPrtg";
import { DatetimeModules } from "../../DatetimeModules/DatetimeModules";
import { InfGenDatetime } from "../../DatetimeModules/InfGenDatetime";
import "./DetailsCategory.css";

export function DetailsCategory() {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [infraGeneral, setInfraGeneral] = useState([]);
  const [groupPrtg, setGroupPrtg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [namePrtgGroup, setNamePrtgGroup] = useState("");
  const [showTablePrtgGroup, setShowTablePrtgGroup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Esta llamada ahora retorna también percentUp por switch
        const response = await getDataInfGen();
        const kpiDevices = response.data.infraestructura_general;

        const percentMap = new Map();
        kpiDevices.forEach((sw) => {
          percentMap.set(sw.name, sw.percentUp);
        });

        const dataStatusInfGen = await useDataInfGen();
        const dataPrtgGroups = await getDataPrtgGroupsUpDown();
        setGroupPrtg(dataPrtgGroups.data);

        let dataInfraGeneral = kpiDevices
          .filter((e) => e.name !== "WLC 9800 NEGOCIO")
          .map((sw) => {
            const upElem = [];
            const downElem = [];

            dataStatusInfGen.downElements.forEach((e) => {
              if (e.name_switch === sw.name) {
                downElem.push(e);
              }
            });
            dataStatusInfGen.upElements.forEach((e) => {
              if (e.name_switch === sw.name) {
                upElem.push(e);
              }
            });

            const swStatus = downElem.length > 0 ? "FAIL" : "OK";
            return {
              name_switch: sw.name,
              rol: sw.rol,
              ip: sw.ip,
              swStatus,
              upElem,
              downElem,
              percentUp: percentMap.get(sw.name) || 0,
              id: sw.id,
            };
          });

        // Ordenar: FAIL primero
        dataInfraGeneral.sort((a, b) => {
          if (a.swStatus === "FAIL" && b.swStatus === "OK") return -1;
          if (a.swStatus === "OK" && b.swStatus === "FAIL") return 1;
          return 0;
        });

        setInfraGeneral(dataInfraGeneral);
        setSearchTerm(getCategoriaQueryParam(location.search));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const filteredInfraGeneral = infraGeneral.filter((obj) => {
    return Object.keys(obj).some((key) =>
      String(obj[key]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredPrtgGroups = groupPrtg.filter((obj) => {
    return Object.keys(obj).some((key) =>
      String(obj[key]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleClickPrtgGroup = (name) => {
    setNamePrtgGroup(name);
    setShowTablePrtgGroup(true);
  };

  return (
    <div>
      <Navbar title={"Infraestructura General"} />
      <InfGenDatetime />
      {loading ? (
        <Spinner />
      ) : (
        <div className="table-topology-ig-container">
          <div className="search-container-ig">
            <label>Buscar por palabra clave:</label>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm.toUpperCase()}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-names-sw-ig-container">
            <table className="table-names-sw-ig">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Rol Equipo</th>
                  <th>Ip</th>
                </tr>
              </thead>
              <tbody>
                {filteredInfraGeneral.length === 0 &&
                filteredPrtgGroups.length === 0 ? (
                  <tr>
                    <td colSpan="4">No hay coincidencias</td>
                  </tr>
                ) : (
                  filteredInfraGeneral.map(
                    (e) =>
                      e.name_switch !== "WLC - MESH" && (
                        <tr key={e.id}>
                          <td className="td-category-ig">
                            <Link
                              style={{ color: "blue" }}
                              to={`/monitoreo/infraestrucura-general/detalles?nombre=${e.name_switch}`}
                            >
                              {e.name_switch}
                            </Link>
                          </td>
                          <td
                            className={`row-ig-table ${
                              e.swStatus === "FAIL" ? "kpi-red" : "kpi-green"
                            }`}
                          >
                            {e.percentUp}% ({e.upElem.length - e.downElem.length} /{" "}
                            {e.upElem.length})
                          </td>
                          <td>{e.rol}</td>
                          <td>{e.ip}</td>
                        </tr>
                      )
                  )
                )}
                {filteredPrtgGroups.map((e, index) => (
                  <tr key={index}>
                    <td
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleClickPrtgGroup(e.device)}
                    >
                      {e.device.toUpperCase()}
                    </td>
                    <td className={e.down >= 1 ? "kpi-red" : "kpi-green"}>
                      {e.up} / {e.down + e.up}
                    </td>
                    <td>{e.group.toUpperCase()}</td>
                    <td>N/A</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showTablePrtgGroup && (
        <TableGroupPrtg name={namePrtgGroup} show={setShowTablePrtgGroup} />
      )}
    </div>
  );

  function getCategoriaQueryParam(search) {
    const params = new URLSearchParams(search);
    return params.get("categoria") || "";
  }
}