const { Vpn_1, Vpn_2, Vpn_3 } = require("../models/vpn");
const { NumberUsersVpn } = require("../models/numberUsersVpn");

async function getUsersVpn1() {
  let numberUsersVpn1 = await NumberUsersVpn.findOne({
    where: {
      vpn: "vpn_1",
    },
  });
  numberUsersVpn1 = numberUsersVpn1.dataValues.num_users

  const vpn_1_users = await Vpn_1.findAll({
    order: [["id", "DESC"]],
    limit: numberUsersVpn1,
  });
  return {'number': numberUsersVpn1, 'users': vpn_1_users};
}

async function getUsersVpn2() {
  let numberUsersVpn2 = await NumberUsersVpn.findOne({
    where: {
      vpn: "vpn_2",
    },
  });
  numberUsersVpn2 = numberUsersVpn2.dataValues.num_users

  const vpn_2_users = await Vpn_2.findAll({
    order: [["id", "DESC"]],
    limit: numberUsersVpn2,
  });
  return {'number': numberUsersVpn2, 'users': vpn_2_users};
}

async function getUsersVpn3() {
  let numberUsersVpn3 = await NumberUsersVpn.findOne({
    where: {
      vpn: "vpn_3",
    },
  });
  numberUsersVpn3 = numberUsersVpn3.dataValues.num_users

  const vpn_3_users = await Vpn_3.findAll({
    order: [["id", "DESC"]],
    limit: numberUsersVpn3,
  });
  return {'number': numberUsersVpn3, 'users': vpn_3_users};
}

async function getUsersVpn() {
  const vpn_1 = await getUsersVpn1();
  const vpn_2 = await getUsersVpn2();
  const vpn_3 = await getUsersVpn3();
  return {'vpn_1': vpn_1, 'vpn_2': vpn_2, 'vpn_3': vpn_3};
}

module.exports = { getUsersVpn };
