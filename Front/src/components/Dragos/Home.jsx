import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import { getDataDragos } from "../../utils/Api-candelaria/api";
import "./Home.css";

export const HomeDragos = () => {
  const [dragos, setDragos] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const fetchData = async () => {
    try {
      const upDragos = [];
      const downDragos = [];
      const data = await getDataDragos();
      if (data.status === 200) {
        data.data.data.forEach((item) => {
          if (item.status.toLowerCase().includes("up")) {
            upDragos.push(item);
          }
          if (item.status.toLowerCase().includes("down")) {
            downDragos.push(item);
          }
        });

        setDragos({
          upDragos,
          downDragos,
        });
        setShowLoading(false);
      }
    } catch (error) {
      console.error("Error obteniedo informacion de Dragos", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (showLoading) {
    return (
      <div className="loading" style={{ display: "grid", placeContent: "center" }}>
        <PuffLoader color={"red"} loading={showLoading} size={50} />
      </div>
    );
  }

  return (
    <div>
      <table className="table-dragos-home">
        <thead>
          <tr>
            <th className="kpi-green">Up</th>
            <th className="kpi-red">Down</th>
            <th>Detalles</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{dragos && dragos.upDragos.length}</td>
            <td>{dragos && dragos.downDragos.length}</td>
            <td>
              {" "}
              <Link to="/candelaria/monitoreo/dragos" className="link-open-pit" style={{ color: "white" }}>
                Ver
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
