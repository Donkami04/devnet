import { useEffect, useState } from "react";
import { getDataPrtgGroups } from "../../../utils/Api-candelaria/api";
import { IoMdCloseCircle } from "react-icons/io";
import { PRTG_URL } from "../../../utils/Api-candelaria/api";
import "./TableGroupPrtg.css";

export function TableGroupPrtg({ name, show }) {
  const [prtgGroup, setPrtgGroup] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getDataPrtgGroups();
        let data = response.data.filter((e) => e.device === name);
        setPrtgGroup(data);
      } catch (error) {
        console.error(
          "Error en el fetchdata del componente group prtg:",
          error
        );
        return error;
      }
    };
    fetchData();
  }, [name]);
  return (
    <div className="main-table-sensors-prtggroups-container">
      <IoMdCloseCircle
        title={"Cerrar"}
        size="2rem"
        color="red"
        style={{ cursor: "pointer" }}
        onClick={() => show(false)}
      />
      <div className="table-sensors-prtggroups-container">
        <h2 style={{ textAlign: "center", backgroundColor: "white" }}>
          {name}
        </h2>
        <table className="table-sensors-prtggroups">
          <thead>
            <tr>
              <th>SENSOR</th>
              <th>ESTADO</th>
              <th>LASTVALUE</th>
            </tr>
          </thead>
          <tbody>
            {prtgGroup.map((e, index) => (
              <tr key={e.name + index + e.sensor}>
                <td>
                  {" "}
                  <a
                    href={`https://10.224.241.25/sensor.htm?id=${e.id_prtg}&tabid=1`}
                    target="_blank"
                  >
                    {e.sensor}
                  </a>
                </td>
                <td
                  className={
                    e.status.includes("Down") ? "kpi-red" : "kpi-green"
                  }
                >
                  {e.status}
                </td>
                <td
                  style={e.lastvalue === "" ? { cursor: "help", color: "red" } : undefined}
                  title={
                    e.lastvalue === ""
                      ? "Fecha del primer registro Down"
                      : undefined
                  }
                >
                  {e.lastvalue === "" ? e.datetime : e.lastvalue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
