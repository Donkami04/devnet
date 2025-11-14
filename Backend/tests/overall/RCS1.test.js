const { getRedClienteServidor_1 } = require("../../services/overall/RCS1");

describe("getRedClienteServidor_1", () => {
  it("#1, no debería restar puntos cuando no hay clientes caídos", () => {
    const allDownClients = [];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#2, no debería restar puntos cuando hay un cliente caído con importancia ALTA", () => {
    const allDownClients = [{ clave: 1, group: "CSP", importancia: "ALTA" }];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#3, debería restar 4 puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo y Clave dentro del rango", () => {
    const allDownClients = [
      { clave: 150, group: "CSP", importancia: "ALTA" },
      { clave: 150, group: "CSP", importancia: "ALTA" },
      { clave: 150, group: "CSP", importancia: "ALTA" },
      { clave: 150, group: "CSP", importancia: "ALTA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(4);
  });

  it("#4, debería restar 2 puntos cuando hay cuatro clientes caídos con importancia MEDIA", () => {
    const allDownClients = [
      { clave: 101, group: "CSP", importancia: "MEDIA" },
      { clave: 101, group: "CSP", importancia: "MEDIA" },
      { clave: 101, group: "CSP", importancia: "MEDIA" },
      { clave: 101, group: "CSP", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(2);
  });

  it("#5, debería restar 0.2 puntos cuando hay cuatro clientes caídos con importancia BAJA", () => {
    const allDownClients = [
      { clave: 101, group: "CSS", importancia: "BAJA" },
      { clave: 101, group: "CSS", importancia: "BAJA" },
      { clave: 101, group: "CSS", importancia: "BAJA" },
      { clave: 101, group: "CSS", importancia: "BAJA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(0.2);
  });

  it("#6, No deberia restar puntos cuando hay dos clientes caídos con importancia ALTA, mismo grupo y clave dentor del rango", () => {
    const allDownClients = [
      { clave: 101, group: "CSP", importancia: "ALTA" },
      { clave: 101, group: "CSP", importancia: "ALTA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#7, Deberia restar 4 puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo y clave 1", () => {
    const allDownClients = [
      { clave: 1, group: "CSS", importancia: "ALTA" },
      { clave: 1, group: "CSS", importancia: "ALTA" },
      { clave: 1, group: "CSS", importancia: "ALTA" },
      { clave: 1, group: "CSS", importancia: "ALTA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(4);
  });

  it("#8, Deberia restar 4 puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo y clave 2", () => {
    const allDownClients = [
      { clave: 2, group: "CSP", importancia: "ALTA" },
      { clave: 2, group: "CSP", importancia: "ALTA" },
      { clave: 2, group: "CSP", importancia: "ALTA" },
      { clave: 2, group: "CSP", importancia: "ALTA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(4);
  });

  it("#9, No Deberia restar puntos cuando hay cuatro clientes caídos con importancia MEDIA, mismo grupo y clave fuera del rango", () => {
    const allDownClients = [
      { clave: 303, group: "CSP", importancia: "MEDIA" },
      { clave: 303, group: "CSP", importancia: "MEDIA" },
      { clave: 303, group: "CSP", importancia: "MEDIA" },
      { clave: 303, group: "CSP", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#10, No Deberia restar puntos cuando hay cuatro clientes caídos con importancia MEDIA, mismo grupo y claves diferentes", () => {
    const allDownClients = [
      { clave: 101, group: "CSP", importancia: "MEDIA" },
      { clave: 102, group: "CSP", importancia: "MEDIA" },
      { clave: 103, group: "CSP", importancia: "MEDIA" },
      { clave: 104, group: "CSP", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#11, No Deberia restar puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo diferentes de CSP y CSS con mismas claves", () => {
    const allDownClients = [
      { clave: 101, group: "HSE", importancia: "MEDIA" },
      { clave: 102, group: "HSE", importancia: "MEDIA" },
      { clave: 103, group: "HSE", importancia: "MEDIA" },
      { clave: 104, group: "HSE", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedClienteServidor_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });
});


