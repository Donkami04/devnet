const {
  StatusClients,
  StatusSwitches,
  StatusUps,
  StatusVpn,
  StatusMesh,
  StatusDevices,
  StatusFirewalls,
  StatusWan,
  StatusIg,
  StatusFim,
  MeshProcess,
  Anillo,
} = require("../models/status_system");
const { DateTimeSystems } = require("../models/datetime_system");

async function date_status_system() {
  const dcs_status = await StatusClients.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const sw_status = await StatusSwitches.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const ups_status = await StatusUps.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const vpn_status = await StatusVpn.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const mesh_status = await StatusMesh.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const devices_status = await StatusDevices.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const firewalls_status = await StatusFirewalls.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const wan_status = await StatusWan.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const ig_status = await StatusIg.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const fim_status = await StatusFim.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });

  const meshProcess = await MeshProcess.findAll();

  const anillo = await Anillo.findAll();

  const data = {
    dcs: dcs_status,
    sw: sw_status,
    ups: ups_status,
    vpn: vpn_status,
    mesh: mesh_status,
    devices: devices_status,
    fw: firewalls_status,
    wan: wan_status,
    ig: ig_status,
    fim: fim_status,
    mesh_process: meshProcess,
    anillo: anillo,
  };

  return data;
}

async function datetime_status_module() {
  try {
    const data = await DateTimeSystems.findAll();
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

module.exports = { date_status_system, datetime_status_module };
