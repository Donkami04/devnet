import PropTypes from "prop-types";
import "./upscard.css";

export function UpsCard({ ups }) {
  let statusText = "";
  let statusClassName = "";
  let statusClassNameBatery = "";
  let statusBatery = "";

  if (ups.status_ups === 3) {
    statusText = "Usando Bateria";
    statusClassName = "status-light yellow";
  } else if (ups.status_ups === 2) {
    statusText = "En linea";
    statusClassName = "status-light green";
  } else if (ups.status_prtg !== 2 && ups.status_prtg !== 3) {
    statusText = "Otro";
    statusClassName = "status-light red";
  }

  if (ups.batery === 2) {
    statusBatery = "Cambio Bateria";
    statusClassNameBatery = "kpi-red";
  } else {
    statusBatery = "OK";
  }

  return (
    <div className="ups-card">
      <div className="ups-card-img">
        <img src="/ups.png" alt="imagen-ups" />
      </div>
      <div>
        <p className={statusClassName}></p>
        <p>
          <span>IP UPS: </span>
          <a
            href={`https://10.224.241.25/device.htm?id=${ups.id_ups}&tabid=1`}
            target="blank"
          >
            {ups.ip}
          </a>
        </p>
        <p>
          <span>Nombre: </span>
          {ups.name}
        </p>
        <p>
          <span>Estado: </span>
          {statusText}
        </p>
        <p className={statusClassNameBatery}>
          <span>Bateria: </span>
          {statusBatery}
        </p>
        <p>
          <span>Ubicación: </span>
          {ups.ubication}
        </p>
        <p>
          <span>Uptime: </span>
          {ups.uptime}%
        </p>
      </div>
    </div>
  );
}

UpsCard.propTypes = {
  ups: PropTypes.shape({
    ip: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status_prtg: PropTypes.string.isRequired,
    status_ups: PropTypes.number.isRequired,
    batery: PropTypes.number.isRequired,
    id_ups: PropTypes.string.isRequired,
    uptime: PropTypes.number.isRequired,
    ubication: PropTypes.string.isRequired,
  }).isRequired,
};
