const { getInfraSolucion } = require('../controllers/dashboards/Candelaria-DCS/infra_solucion');

describe('getInfraSolucion', () => {
  const mockSwitches = [
    {
      status_prtg: 'Up',
      group: 'CSP'
    },
    {
      status_prtg: 'Down',
      group: 'CSS'
    },
    {
      status_prtg: 'Paused',
      group: 'CNP'
    },
    {
      status_prtg: 'Down (knoweldge)',
      group: 'HSE'
    },
    {
      status_prtg: 'Paused by parent',
      group: 'HSE'
    },
    {
      status_prtg: 'Unusual',
      group: 'HSE'
    },
    {
      status_prtg: 'Unknown',
      group: 'CSP'
    },
    // Agrega más objetos de prueba según sea necesario
  ];

  test('El indicador infra solucion debe ser 37.50 y el json retornado igual a expectedSwitchesStatus', () => {
    const expectedSwitchesStatus = {
      csp_up: 1,
      css_up: 0,
      cnp_up: 0,
      cns_up: 0,
      hse_up: 0,
      csp_down: 0,
      css_down: 1,
      cnp_down: 0,
      cns_down: 0,
      hse_down: 1,
      csp_paused: 0,
      css_paused: 0,
      cnp_paused: 1,
      cns_paused: 0,
      hse_paused: 1,
    };
  
    const expectedIndicador = 42.86;
  
    const result = getInfraSolucion(mockSwitches);
  
    expect(result.switchesStatus).toEqual(expectedSwitchesStatus);
    expect(result.indicador).toBe(expectedIndicador);
  });
});
