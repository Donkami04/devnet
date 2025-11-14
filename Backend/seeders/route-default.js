"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("route_default", [
      {
        via_bgp: "true",
        name: "ADMIN",
        red: "it",
        ip_switch: "10.224.127.1",
      },
      {
        via_bgp: "true",
        name: "CONCE",
        red: "it",
        ip_switch: "10.224.127.2",
      },
      {
        via_bgp: "true",
        name: "OJOS",
        red: "it",
        ip_switch: "10.230.127.1",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("route_default", null, {});
  },
};
