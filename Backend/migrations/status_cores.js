module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("status_cores", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("status_cores");
  },
};
