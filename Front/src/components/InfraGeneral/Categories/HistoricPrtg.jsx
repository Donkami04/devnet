import { useEffect, useState } from "react";
import { envi } from "../../../utils/Api-candelaria/api";
import "./HistoricPrtg.css";

export const HistoricPrtg = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://${envi}:3001/api/v1/candelaria/dockers/historic/prtg-down`
        );
        const result = await res.json();
        if (result.statusCode === 200) {
          setData(result.data);
        } else {
          setError("Error al obtener los datos");
        }
      } catch (err) {
        setError("No se pudo conectar con la API");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="table-message">Cargando...</p>;
  if (error) return <p className="table-message error">{error}</p>;

  return (
    <div className="table-container">
      <table className="historic-table-prtg">
        <thead>
          <tr>
            <th>Inicio de caída</th>
            <th>Fin de caída</th>
            <th>Duración (min)</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.downDatetime}</td>
                <td>{item.upDatetime}</td>
                <td>
                  {item.duration === 10
                    ? "< 10 minutos"
                    : `${item.duration} minutos`}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No hay registros históricos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
