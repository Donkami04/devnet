function getInfraSolucion(allSwitches) {
  const switchesStatus = {
      csp_up: allSwitches.filter(switch_ => switch_.status_prtg === 'Up' && switch_.group === 'CSP').length,
      css_up: allSwitches.filter(switch_ => switch_.status_prtg === 'Up' && switch_.group === 'CSS').length,
      cnp_up: allSwitches.filter(switch_ => switch_.status_prtg === 'Up' && switch_.group === 'CNP').length,
      cns_up: allSwitches.filter(switch_ => switch_.status_prtg === 'Up' && switch_.group === 'CNS').length,
      hse_up: allSwitches.filter(switch_ => switch_.status_prtg === 'Up' && switch_.group === 'HSE').length,
      csp_down: allSwitches.filter(switch_ => switch_.status_prtg.includes('Down') && switch_.group === 'CSP').length,
      css_down: allSwitches.filter(switch_ => switch_.status_prtg.includes('Down') && switch_.group === 'CSS').length,
      cnp_down: allSwitches.filter(switch_ => switch_.status_prtg.includes('Down') && switch_.group === 'CNP').length,
      cns_down: allSwitches.filter(switch_ => switch_.status_prtg.includes('Down') && switch_.group === 'CNS').length,
      hse_down: allSwitches.filter(switch_ => switch_.status_prtg.includes('Down') && switch_.group === 'HSE').length,
      csp_paused: allSwitches.filter(switch_ => switch_.status_prtg.includes('Paused') && switch_.group === 'CSP').length,
      css_paused: allSwitches.filter(switch_ => switch_.status_prtg.includes('Paused') && switch_.group === 'CSS').length,
      cnp_paused: allSwitches.filter(switch_ => switch_.status_prtg.includes('Paused') && switch_.group === 'CNP').length,
      cns_paused: allSwitches.filter(switch_ => switch_.status_prtg.includes('Paused') && switch_.group === 'CNS').length,
      hse_paused: allSwitches.filter(switch_ => switch_.status_prtg.includes('Paused') && switch_.group === 'HSE').length,
  };
  
  const totalSwitches = allSwitches.length;
  const totalDown = allSwitches.filter(switch_ => switch_.status_prtg.includes('Down')).length;
  const totalPaused = allSwitches.filter(switch_ => switch_.status_prtg.includes('Paused')).length;
  const indicator = parseFloat(((totalSwitches - totalDown - totalPaused) / totalSwitches * 100).toFixed(2));

  return { indicador: indicator, switchesStatus: switchesStatus };
};

module.exports = { getInfraSolucion };