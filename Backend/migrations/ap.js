module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("data_ap", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ip : {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    });

    await queryInterface.createTable("ap", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ip : {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("data_ap");
    await queryInterface.dropTable("ap");
  },
};
