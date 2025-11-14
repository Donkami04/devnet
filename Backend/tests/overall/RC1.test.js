const { getRedControl_1 } = require("../../services/overall/RC1");

describe("getRedControl_1", () => {
  it("#1, no debería restar puntos cuando no hay clientes caídos", () => {
    const allDownClients = [];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#2, no debería restar puntos cuando hay un cliente caído con importancia ALTA", () => {
    const allDownClients = [{ clave: 301, group: "CNP", importancia: "ALTA" }];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#3, debería restar 4 puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo y Clave dentro del rango", () => {
    const allDownClients = [
      { clave: 350, group: "CNS", importancia: "ALTA" },
      { clave: 350, group: "CNS", importancia: "ALTA" },
      { clave: 350, group: "CNS", importancia: "ALTA" },
      { clave: 350, group: "CNS", importancia: "ALTA" },
    ];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(4);
  });

  it("#4, debería restar 2 puntos cuando hay cuatro clientes caídos con importancia MEDIA", () => {
    const allDownClients = [
      { clave: 311, group: "CNP", importancia: "MEDIA" },
      { clave: 311, group: "CNP", importancia: "MEDIA" },
      { clave: 311, group: "CNP", importancia: "MEDIA" },
      { clave: 311, group: "CNP", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(2);
  });

  it("#5, debería restar 0.2 puntos cuando hay cuatro clientes caídos con importancia BAJA", () => {
    const allDownClients = [
      { clave: 318, group: "CNPB", importancia: "BAJA" },
      { clave: 318, group: "CNPB", importancia: "BAJA" },
      { clave: 318, group: "CNPB", importancia: "BAJA" },
      { clave: 318, group: "CNPB", importancia: "BAJA" },
    ];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(0.2);
  });

  it("#6, No deberia restar puntos cuando hay dos clientes caídos con importancia ALTA, mismo grupo y clave dentor del rango", () => {
    const allDownClients = [
      { clave: 310, group: "CNSB", importancia: "ALTA" },
      { clave: 310, group: "CNSB", importancia: "ALTA" },
    ];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#7, No Deberia restar puntos cuando hay cuatro clientes caídos con importancia MEDIA, mismo grupo y clave fuera del rango", () => {
    const allDownClients = [
      { clave: 299, group: "CNP", importancia: "MEDIA" },
      { clave: 299, group: "CNP", importancia: "MEDIA" },
      { clave: 299, group: "CNP", importancia: "MEDIA" },
      { clave: 299, group: "CNP", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#8, No Deberia restar puntos cuando hay cuatro clientes caídos con importancia MEDIA, mismo grupo y claves diferentes", () => {
    const allDownClients = [
      { clave: 301, group: "CNS", importancia: "MEDIA" },
      { clave: 302, group: "CNS", importancia: "MEDIA" },
      { clave: 303, group: "CNS", importancia: "MEDIA" },
      { clave: 304, group: "CNS", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#9, No Deberia restar puntos cuando hay cuatro clientes caídos con importancia ALTA, mismo grupo diferentes de CNP, CNS, CNPB y CNSB con mismas claves", () => {
    const allDownClients = [
      { clave: 310, group: "CSP", importancia: "MEDIA" },
      { clave: 310, group: "CSP", importancia: "MEDIA" },
      { clave: 310, group: "CSP", importancia: "MEDIA" },
      { clave: 310, group: "CSP", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedControl_1(allDownClients);
    expect(puntosRestados).toBe(0);
  });

});


