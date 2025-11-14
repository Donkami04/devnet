const { getRed_HSE } = require("../../services/overall/RHSE");

describe("getRed_HSE", () => {
  it("#1, No debería restar puntos cuando no hay clientes caídos", () => {
    const allDownClients = [];
    const puntosRestados = getRed_HSE(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#2, Debería restar 4 puntos cuando hay 1 cliente caídos grupo HSE importancia ALTA", () => {
    const allDownClients = [
      { group: "HSE", importancia: "ALTA" },
    ];
    const puntosRestados = getRed_HSE(allDownClients);
    expect(puntosRestados).toBe(4);
  });

  it("#3, Debería restar 2 puntos cuando hay 1 cliente caídos grupo HSE ", () => {
    const allDownClients = [
      { group: "HSE", importancia: "MEDIA" },
    ];
    const puntosRestados = getRed_HSE(allDownClients);
    expect(puntosRestados).toBe(2);
  });

  it("#4, Debería restar 8 puntos cuando hay 2 clientes caídos grupo HSE ", () => {
    const allDownClients = [
      { group: "HSE", importancia: "ALTA" },
      { group: "HSE", importancia: "ALTA" },
    ];
    const puntosRestados = getRed_HSE(allDownClients);
    expect(puntosRestados).toBe(8);
  });

  it("#5, No debería restar puntos cuando hay 1 cliente caído grupo CNP importancia ALTA", () => {
    const allDownClients = [
      { clave: 1, group: "CNP", importancia: "ALTA" },
    ];
    const puntosRestados = getRed_HSE(allDownClients);
    expect(puntosRestados).toBe(0);
  });

});