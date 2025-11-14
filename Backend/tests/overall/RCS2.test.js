const { getRedClienteServidor_2 } = require("../../services/overall/RCS2");

describe("getRedClienteServidor_2", () => {
  it("#1, no debería restar puntos cuando no hay clientes caídos", () => {
    const allDownClients = [];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#2, no debería restar puntos cuando hay un cliente caído con importancia ALTA", () => {
    const allDownClients = [{ clave: 218, group: "CSP", importancia: "ALTA" }];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#3, debería restar 4 puntos cuando hay dos clientes caídos con importancia ALTA, mismo grupo y Clave dentro del rango", () => {
    const allDownClients = [
      { clave: 250, group: "CSP", importancia: "ALTA" },
      { clave: 250, group: "CSP", importancia: "ALTA" },
    ];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(4);
  });

  it("#4, debería restar 2 puntos cuando hay dos clientes caídos con importancia MEDIA y clave dentro del rango", () => {
    const allDownClients = [
      { clave: 233, group: "CSP", importancia: "MEDIA" },
      { clave: 233, group: "CSP", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(2);
  });

  it("#5, debería restar 0.2 puntos cuando hay dos clientes caídos con importancia BAJA y clave dentro del rango", () => {
    const allDownClients = [
      { clave: 288, group: "CSS", importancia: "BAJA" },
      { clave: 288, group: "CSS", importancia: "BAJA" },
    ];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(0.2);
  });

  it("#6, No Deberia restar puntos cuando hay dos clientes caídos con importancia MEDIA, mismo grupo y clave fuera del rango", () => {
    const allDownClients = [
      { clave: 303, group: "CSP", importancia: "MEDIA" },
      { clave: 303, group: "CSP", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#7, No Deberia restar puntos cuando hay dos clientes caídos con importancia MEDIA, mismo grupo y clave fuera del rango", () => {
    const allDownClients = [
      { clave: 55, group: "CSP", importancia: "ALTA" },
      { clave: 55, group: "CSP", importancia: "ALTA" },
    ];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#8, No Deberia restar puntos cuando hay dos clientes caídos con importancia MEDIA, mismo grupo y claves diferentes", () => {
    const allDownClients = [
      { clave: 201, group: "CSS", importancia: "MEDIA" },
      { clave: 202, group: "CSS", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });

  it("#9, No Deberia restar puntos cuando hay dos clientes caídos con importancia MEDIA, mismo grupo dif de CSP y CSS con claves iguales", () => {
    const allDownClients = [
      { clave: 201, group: "CSS", importancia: "MEDIA" },
      { clave: 202, group: "CSS", importancia: "MEDIA" },
    ];
    const puntosRestados = getRedClienteServidor_2(allDownClients);
    expect(puntosRestados).toBe(0);
  });
});
