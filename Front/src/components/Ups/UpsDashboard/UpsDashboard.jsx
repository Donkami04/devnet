import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./upsdashboard.css";

export function UpsDashboard({ allUps }) {
  const tableToShow = "ups";
  const [enLineaCount, setEnLineaCount] = useState(0);
  const [usandoBateriaCount, setUsandoBateriaCount] = useState(0);
  const [otroCount, setOtroCount] = useState(0);
  const [bateryChange, setBateryChange] = useState(0);

  useEffect(() => {
    let enLinea = 0;
    let usandoBateria = 0;
    let otro = 0;
    let changeBateria = 0;

    allUps.forEach((ups) => {
      if (ups.status_ups === 2) {
        enLinea++;
      }
      if (ups.status_ups === 3) {
        usandoBateria++;
      }
      if (ups.status_ups !== 3 && ups.status_ups !== 2) {
        otro++;
      }
      if (ups.batery === 2) {
        changeBateria++;
      }
    });

    setEnLineaCount(enLinea);
    setUsandoBateriaCount(usandoBateria);
    setOtroCount(otro);
    setBateryChange(changeBateria);
  }, [allUps]);

  return (
    <>
      <div className="ups-section">
        <main className="main-section">
          <h2>Estados</h2>
          <table className="kpi-table ups-table">
            <tbody>
              <tr>
                <td>
                  <p className="light-indicator green-light"></p>En línea
                </td>
                <td>{enLineaCount}</td>
              </tr>
              <tr>
                <td>
                  <p className="light-indicator yellow-light"></p>Usando batería
                </td>
                <td>{usandoBateriaCount}</td>
              </tr>
              <tr>
                <td>
                  <p className="light-indicator red-light"></p>Otro
                </td>
                <td>{otroCount}</td>
              </tr>
              <tr>
                <td>
                  <p className="warning-light">🪫</p>Cambio Bateria
                </td>
                <td>{bateryChange}</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}

UpsDashboard.propTypes = {
  allUps: PropTypes.arrayOf(
    PropTypes.shape({
      ip: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status_prtg: PropTypes.string.isRequired,
      status_ups: PropTypes.number.isRequired,
      batery: PropTypes.number.isRequired,
      id_ups: PropTypes.string.isRequired,
      uptime: PropTypes.number.isRequired,
      ubication: PropTypes.string.isRequired,
    })
  ).isRequired,
};
