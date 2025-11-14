// RC 2 = Red Control 2

function getRedControl_2(allClientsDown) {
  let puntos_a_restar = 0;
  const claves_set = new Set();
  for (const cliente of allClientsDown) {
    const clave = cliente["clave"];
    claves_set.add(clave);
  }
  const list_claves = Array.from(claves_set);

  // Create a dictionary for each key in list_claves
  const kpi2_conectivity = {};
  for (const clave of list_claves) {
    if (clave == 1 || clave == 2) {
      kpi2_conectivity[clave] = [];
    }
  }

  // Add elements to the corresponding list in the kpi2_conectivity dictionary
  for (const cliente of allClientsDown) {
    if (
      cliente["clave"] in kpi2_conectivity &&
      (cliente["group"] == "CNP" || cliente["group"] == "CNS")
    ) {
      kpi2_conectivity[cliente["clave"]].push(cliente);
    }
  }

  for (const clave in kpi2_conectivity) {
    if (kpi2_conectivity[clave].length == 4) {
      puntos_a_restar += 4;
    }
  }

  return puntos_a_restar;
}

module.exports = { getRedControl_2 };
