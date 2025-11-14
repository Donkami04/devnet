import "./Group_Prtg.css";

export function Group_Prtg({ data }) {
  data.sort((a, b) => {
    if (a.status.includes("Down") && !b.status.includes("Down")) {
      return -1; // a debe ir antes que b
    } else if (!a.status.includes("Down") && !b.status.includes("Down")) {
      return 1; // b debe ir antes que a
    } else {
      return 0; // no se cambia el orden
    }
  });

  return (
    <div className="table-group-prtg-container">
      <table className="table-group-prtg">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>ESTADO</th>
            <th>LASTVALUE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id_prtg}>
              <td>
                {" "}
                <a
                  href={`https://10.224.241.25/sensor.htm?id=${e.id_prtg}&tabid=1`}
                  target="_blank"
                >
                  {e.device}
                </a>
              </td>
              <td
                className={e.status.includes("Down") ? "kpi-red" : "kpi-green"}
              >
                {e.status}
              </td>
              <td>{e.lastvalue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
