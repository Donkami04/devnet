// RC 1 = Red Control 1

function getRedControl_1(allClientsDown) {
  let puntos_a_restar = 0;
  const claves_set = new Set();
  for (const cliente of allClientsDown) {
    const clave = cliente["clave"];
    claves_set.add(clave);
  }
  const list_claves = Array.from(claves_set);

  // Create a dictionary for each key in list_claves
  const kpi2 = {};
  for (const clave of list_claves) {
    if (clave > 300) {
      kpi2[clave] = [];
    }
  }

  // Add elements to the corresponding list in the kpi2 dictionary
  for (const cliente of allClientsDown) {
    if (
      cliente["clave"] in kpi2 &&
      (cliente["group"] == "CNP" ||
        cliente["group"] == "CNS" ||
        cliente["group"] == "CNPB" ||
        cliente["group"] == "CNSB")
    ) {
      kpi2[cliente["clave"]].push(cliente);
    }
  }

  for (const [clave, cliente_por_clave] of Object.entries(kpi2)) {
    // If there are no elements other than 'ALTA', 'todos_alta' will be true
    let todos_alta = true;
    for (const cliente of cliente_por_clave) {
      if (cliente["importancia"] != "ALTA") {
        todos_alta = false;
        break;
      }
    }
    if (todos_alta && cliente_por_clave.length == 4) {
      puntos_a_restar += 4;
    }
  }

  for (const [clave, cliente_por_clave] of Object.entries(kpi2)) {
    // If there are no elements other than 'MEDIA', 'todos_media' will be true
    let todos_media = true;
    for (const cliente of cliente_por_clave) {
      if (cliente["importancia"] != "MEDIA") {
        todos_media = false;
        break;
      }
    }
    if (todos_media && cliente_por_clave.length == 4) {
      puntos_a_restar += 2;
    }
  }

  for (const [clave, cliente_por_clave] of Object.entries(kpi2)) {
    // If there are no elements other than 'BAJA', 'todos_baja' will be true
    let todos_baja = true;
    for (const cliente of cliente_por_clave) {
      if (cliente["importancia"] != "BAJA") {
        todos_baja = false;
        break;
      }
    }
    if (todos_baja && cliente_por_clave.length == 4) {
      puntos_a_restar += 0.2;
    }
  }

  // let indicador_kpi_2 = Math.round(((total_puntos - puntos_a_restar)/total_puntos) * 100);
  return puntos_a_restar;
}

module.exports = { getRedControl_1 };
