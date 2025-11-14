const { getDisponibilidad } = require('../controllers/dashboards/Candelaria-DCS/disponibilidad');

describe('getDisponibilidad', () => {
  const mockClients = [
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
      status_prtg: 'Paused (paused)',
      group: 'CNSB'
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
  ];

  test('El indicador disponibilidad debe ser 37.50 y el json retornado igual a expectedClientsStatus', () => {
    const expectedClientsStatus = {
      csp_up: 1,
      css_up: 0,
      cnp_up: 0,
      cns_up: 0,
      hse_up: 0,
      cnpb_up: 0,
      cnsb_up: 0,
      csp_down: 0,
      css_down: 1,
      cnp_down: 0,
      cns_down: 0,
      hse_down: 1,
      cnpb_down: 0,
      cnsb_down: 0,
      csp_paused: 0,
      css_paused: 0,
      cnp_paused: 1,
      cns_paused: 0,
      hse_paused: 1,
      cnpb_paused: 0,
      cnsb_paused: 1,
    };
  
    const expectedIndicador = 37.50;
  
    const result = getDisponibilidad(mockClients);
  
    expect(result.clientsStatus).toEqual(expectedClientsStatus);
    expect(result.indicador).toBe(expectedIndicador);
  });
})  
