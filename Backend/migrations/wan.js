module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("data_wan", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
    });

    await queryInterface.createTable("fechas_consultas_wan", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ultima_consulta: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      estado: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    });

    await queryInterface.createTable("wan", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      sensor: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      last_uptime_days: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      last_uptime_percent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      last_down_days: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      last_down_percent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      current_uptime_percent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      today_uptime_percent: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("data_wan");
    await queryInterface.dropTable("wan");
    await queryInterface.dropTable("fechas_consultas_wan");
  },
};
