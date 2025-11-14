module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable("clients_pac", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastup_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      lastdown_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_ip_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      device_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      port_cisco: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      reachability_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("clients_pac");
  },
};
