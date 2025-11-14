const { getRedClienteServidor_1 } = require("../../../services/overall/RCS1");
const { getRedClienteServidor_2 } = require("../../../services/overall/RCS2");
const { getRedControl_1 } = require("../../../services/overall/RC1");
const { getRedControl_2 } = require("../../../services/overall/RC2");
const { getRed_HSE } = require("../../../services/overall/RHSE");

// Filtramos por aquellos clientes que incluyan en estado "Down" o "Paused (paused)"
const getDownClients = (listAllClients) => {
  return listAllClients.filter((client) => client.status_prtg.includes("Down"));
};

function overall(listAllClients) {
  const listAllDownClients = getDownClients(listAllClients);

  const redClienteServidor1 = getRedClienteServidor_1(listAllDownClients);
  const redClienteServidor2 = getRedClienteServidor_2(listAllDownClients);
  const puntosRestarRCS = redClienteServidor1 + redClienteServidor2;

  const redControl1 = getRedControl_1(listAllDownClients);
  const redControl2 = getRedControl_2(listAllDownClients);
  const puntosRestarRC = redControl1 + redControl2;

  const puntosRestarRHSE = getRed_HSE(listAllDownClients);

  const puntosTotalesRCS = 31;
  const puntosTotalesRC = 168;
  const puntosTotalesHSE = 92;

  const porcentajeRCS = parseFloat(
    (((puntosTotalesRCS - puntosRestarRCS) / puntosTotalesRCS) * 100).toFixed(2)
  );
  const porcentajeRC = parseFloat(
    (((puntosTotalesRC - puntosRestarRC) / puntosTotalesRC) * 100).toFixed(2)
  );
  const porcentajeHSE = parseFloat(
    (((puntosTotalesHSE - puntosRestarRHSE) / puntosTotalesHSE) * 100).toFixed(
      2
    )
  );
  const resultado_overall = parseFloat(
    ((porcentajeRCS + porcentajeRC + porcentajeHSE) / 3).toFixed(2)
  );

  return {
    indicador: resultado_overall,
    "Red Cliente Servidor": porcentajeRCS,
    "Red de Control": porcentajeRC,
    "Red HSE": porcentajeHSE,
  };
}

module.exports = { overall, getDownClients };
