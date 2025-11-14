import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import "./FailHistoryFw.css";

export function FailHistoryFw({
  fwHistory,
  arrayHistoryFail,
  setShowHistoryTable,
}) {
  const [datesList, setDatesList] = useState([]);
  useEffect(() => {
    const dates = arrayHistoryFail.map((e) => e.datetime);
    setDatesList(dates);
  }, [arrayHistoryFail]); // Este efecto se ejecutará cada vez que arrayHistoryFail cambie

  return (
    <div className="dates-reset-fw">
      <MdArrowForwardIos
        onClick={() => setShowHistoryTable(false)}
        style={{
          position: "absolute",
          top: "10px",
          left: "5px",
          cursor: "pointer",
        }}
      />
      <h2 style={{ textAlign: "center" }}>Fechas del Fallo</h2>
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ textAlign: "center" }}>
          {fwHistory.name} - {fwHistory.canal}
        </h3>
        {datesList.map((e) => (
          <div className="dates-container" key={e}>
            <p>{e}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
