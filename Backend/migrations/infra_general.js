module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("data_neighbors", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip_neighbor: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      neighbor: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ip_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      interface: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("interfaces", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(225),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      id_prtg: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
      },
      ip_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });

    await queryInterface.createTable("historic_interfaces", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(225),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      id_prtg: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      ip_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });

    await queryInterface.createTable("neighbors", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip_neighbor: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      neighbor: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ip_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      interface: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });

    await queryInterface.createTable("historic_neighbors", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip_neighbor: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      neighbor: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ip_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      interface: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });

    await queryInterface.createTable("route_default", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      via_bgp: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      ip_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("historic_route_default", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      via_bgp: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      ip_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("system_health", {
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
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastvalue: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      id_prtg: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
      },
      ip_switch: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });

    await queryInterface.createTable("historic_system_health", {
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
      status: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastvalue: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      id_prtg: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
      },
      ip_switch: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    });

    await queryInterface.createTable("data_inf_gen", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rol: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      name_switch: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("data_neighbors");
    await queryInterface.dropTable("interfaces");
    await queryInterface.dropTable("neighbors");
    await queryInterface.dropTable("route_default");
    await queryInterface.dropTable("system_health");
    await queryInterface.dropTable("historic_interfaces");
    await queryInterface.dropTable("historic_neighbors");
    await queryInterface.dropTable("historic_route_default");
    await queryInterface.dropTable("historic_system_health");
    await queryInterface.dropTable("data_inf_gen");
  },
};
