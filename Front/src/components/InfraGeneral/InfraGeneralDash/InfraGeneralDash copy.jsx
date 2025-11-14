import { useState, useEffect } from 'react';
import { useInfGenDash } from '../../../hooks/useInfGenDash deprecated';
import './InfraGeneralDash.css';

export function InfraGeneralDash() {
  const [infGenDash, setInfGenDash] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useInfGenDash();
        setInfGenDash(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!infGenDash) {
    // Renderiza un indicador de carga mientras se resuelve la promesa
    return <p>Cargando...</p>;
  }

  const infGenDashUp = infGenDash.upElements;
  const infGenDashDown = infGenDash.downElements;

  return (
    <>
      <table className="infra-dash-table">
        <thead>
          <tr>
            <th>ELEMENTO</th>
            <th className="kpi-green">UP</th>
            <th className="kpi-red">FAIL</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CORE</td>
            <td>{infGenDashUp}</td>
            <td>{infGenDashDown}</td>
            <td>{infGenDashUp + infGenDashDown}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
