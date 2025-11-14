function getDisponibilidad (listAllClients) {
  const clientsStatus = {
      csp_up: listAllClients.filter(sensor => sensor.status_prtg.includes('Up') && sensor.group === 'CSP').length,
      css_up: listAllClients.filter(sensor => sensor.status_prtg.includes('Up') && sensor.group === 'CSS').length,
      cnp_up: listAllClients.filter(sensor => sensor.status_prtg.includes('Up') && sensor.group === 'CNP').length,
      cns_up: listAllClients.filter(sensor => sensor.status_prtg.includes('Up') && sensor.group === 'CNS').length,
      hse_up: listAllClients.filter(sensor => sensor.status_prtg.includes('Up') && sensor.group === 'HSE').length,
      cnpb_up: listAllClients.filter(sensor => sensor.status_prtg.includes('Up') && sensor.group === 'CNPB').length,
      cnsb_up: listAllClients.filter(sensor => sensor.status_prtg.includes('Up') && sensor.group === 'CNSB').length,

      csp_down: listAllClients.filter(sensor => sensor.status_prtg.includes('Down') && sensor.group === 'CSP').length,
      css_down: listAllClients.filter(sensor => sensor.status_prtg.includes('Down') && sensor.group === 'CSS').length,
      cnp_down: listAllClients.filter(sensor => sensor.status_prtg.includes('Down') && sensor.group === 'CNP').length,
      cns_down: listAllClients.filter(sensor => sensor.status_prtg.includes('Down') && sensor.group === 'CNS').length,
      hse_down: listAllClients.filter(sensor => sensor.status_prtg.includes('Down') && sensor.group === 'HSE').length,
      cnpb_down: listAllClients.filter(sensor => sensor.status_prtg.includes('Down') && sensor.group === 'CNPB').length,
      cnsb_down: listAllClients.filter(sensor => sensor.status_prtg.includes('Down') && sensor.group === 'CNSB').length,

      csp_paused: listAllClients.filter(sensor => sensor.status_prtg.includes('Paused') && sensor.group === 'CSP').length,
      css_paused: listAllClients.filter(sensor => sensor.status_prtg.includes('Paused') && sensor.group === 'CSS').length,
      cnp_paused: listAllClients.filter(sensor => sensor.status_prtg.includes('Paused') && sensor.group === 'CNP').length,
      cns_paused: listAllClients.filter(sensor => sensor.status_prtg.includes('Paused') && sensor.group === 'CNS').length,
      hse_paused: listAllClients.filter(sensor => sensor.status_prtg.includes('Paused') && sensor.group === 'HSE').length,
      cnpb_paused: listAllClients.filter(sensor => sensor.status_prtg.includes('Paused') && sensor.group === 'CNPB').length,
      cnsb_paused: listAllClients.filter(sensor => sensor.status_prtg.includes('Paused') && sensor.group === 'CNSB').length,
  };
    
  const total_clients = listAllClients.length;
  const total_down = listAllClients.filter(client => client.status_prtg.includes('Down')).length;
  const total_paused = listAllClients.filter(client => client.status_prtg.includes('Paused')).length;
  const indicador = parseFloat((((total_clients - total_down - total_paused) / total_clients) * 100).toFixed(2));

  return {indicador: indicador, clientsStatus: clientsStatus};
};

module.exports = { getDisponibilidad }