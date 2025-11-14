const { getRedControl_2 } = require("../../services/overall/RC2");

describe("getRedControl_2", () => {
  it("#1, no debería restar puntos cuando no hay clientes caídos", () => {
    const allDownClients = [];
    const puntosRestados = getRedControl_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#2, no debería restar puntos cuando hay un cliente caído con importancia ALTA", () => {
    const allDownClients = [{ clave: 1, group: "CNP", importancia: "ALTA" }];
    const puntosRestados = getRedControl_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#3, debería restar 4 puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo y Clave 1", () => {
    const allDownClients = [
      { clave: 1, group: "CNS", importancia: "ALTA" },
      { clave: 1, group: "CNS", importancia: "ALTA" },
      { clave: 1, group: "CNS", importancia: "ALTA" },
      { clave: 1, group: "CNS", importancia: "ALTA" },
    ];
    const puntosRestados = getRedControl_2(allDownClients);
    expect(puntosRestados).toBe(4);
  });

  it("#4, debería restar 4 puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo y Clave 2", () => {
    const allDownClients = [
      { clave: 2, group: "CNP", importancia: "ALTA" },
      { clave: 2, group: "CNP", importancia: "ALTA" },
      { clave: 2, group: "CNP", importancia: "ALTA" },
      { clave: 2, group: "CNP", importancia: "ALTA" },
    ];
    const puntosRestados = getRedControl_2(allDownClients);
    expect(puntosRestados).toBe(4);
  });

  it("#5, No deberia restar puntos cuando hay 3 clientes caídos con importancia ALTA, mismo grupo y clave 1", () => {
    const allDownClients = [
      { clave: 1, group: "CNS", importancia: "ALTA" },
      { clave: 1, group: "CNS", importancia: "ALTA" },
      { clave: 1, group: "CNS", importancia: "ALTA" },
    ];
    const puntosRestados = getRedControl_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#6, No Deberia restar puntos cuando hay 2 clientes caídos con importancia ALTA, mismo grupo y clave 2", () => {
    const allDownClients = [
      { clave: 2, group: "CNP", importancia: "ALTA" },
      { clave: 2, group: "CNP", importancia: "ALTA" },
    ];
    const puntosRestados = getRedControl_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#7, No Deberia restar puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo y claves malas", () => {
    const allDownClients = [
      { clave: 302, group: "CNP", importancia: "ALTA" },
      { clave: 302, group: "CNP", importancia: "ALTA" },
      { clave: 302, group: "CNP", importancia: "ALTA" },
      { clave: 302, group: "CNP", importancia: "ALTA" },
    ];
    const puntosRestados = getRedControl_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#8, No Deberia restar puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo diferentes de CNP, CNS, CNPB y CNSB con clave 2", () => {
    const allDownClients = [
      { clave: 2, group: "HSE", importancia: "ALTA" },
      { clave: 2, group: "HSE", importancia: "ALTA" },
      { clave: 2, group: "HSE", importancia: "ALTA" },
      { clave: 2, group: "HSE", importancia: "ALTA" },
    ];
    const puntosRestados = getRedControl_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

});