function getRed_HSE(allDownclients) {
  let puntos_a_restar = 0;
  const allHseDown = allDownclients.filter(
    (client) => client.group === "HSE"
  );

  allHseDown.forEach((client) => {
    if (client.importancia === "ALTA") {
      puntos_a_restar += 4;
    } else if (client.importancia === "MEDIA") {
      puntos_a_restar += 2;
    } else if (client.importancia === "BAJA") {
      puntos_a_restar += 0.2;
    }
  });

  return puntos_a_restar;
};

module.exports = { getRed_HSE };