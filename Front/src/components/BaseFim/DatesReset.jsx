import { MdArrowForwardIos } from "react-icons/md";
import BeatLoader from "react-spinners/BeatLoader";
import "./BaseFim.css";

export function DatesReset({
  months,
  month,
  setMonth,
  changeMonth,
  dataDownSelected,
  baseName,
  setShowDatesReset,
  loadingNewDataRangeDate,
}) {
  dataDownSelected = dataDownSelected.sort((a, b) => b.id - a.id);

  return (
    <div className="dates-reset">
      <MdArrowForwardIos
        onClick={() => setShowDatesReset(false)}
        style={{
          position: "absolute",
          top: "10px",
          left: "5px",
          cursor: "pointer",
        }}
      />
      <h2 style={{ textAlign: "center" }}>Fechas de reinicio en el mes de {month}</h2>
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ marginBottom: "1rem" }}>{baseName}</h3>
        <select
          style={{ marginBottom: "1rem" }}
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            changeMonth(baseName, e.target.value);
          }}
        >
          <option value="">Selecciona un mes</option>
          {months.map((mes, index) => (
            <option key={index} value={mes}>
              {mes}
            </option>
          ))}
        </select>
        <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
          Total de reinicios en <span style={{ fontWeight: "bolder" }}>{month}</span>: {dataDownSelected.length}
        </p>

        {loadingNewDataRangeDate ? (
          <div style={{ marginTop: "8rem" }}>
            <BeatLoader />
          </div>
        ) : dataDownSelected.length === 0 ? (
          <p style={{ marginTop: "2rem" }}>No hay registros de intentos de reinicio</p>
        ) : (
          dataDownSelected.map((e) => (
            <div className="dates-container" key={e.id}>
              <table className="table-reset-fim">
                <tbody>
                  <tr>
                    {/* <td>{e.id}</td> */}
                    <td>{e.date}</td>
                    <td
                      style={{
                        width: "30%",
                        color: e.status === "Fail" ? "red" : "inherit",
                        fontWeight: e.status === "Failed" ? "bolder" : "normal",
                      }}
                    >
                      {e.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
