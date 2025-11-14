"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("status_cores", [
      {
        ip: "10.224.127.1",
        red: "it",
        name: "ADMIN",
        status: "Up",
      },
      {
        ip: "10.224.127.2",
        red: "it",
        name: "CONCE",
        status: "Up",
      },
      {
        ip: "10.230.127.1",
        red: "it",
        name: "OJOS",
        status: "Up",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("status_cores", null, {});
  },
};
