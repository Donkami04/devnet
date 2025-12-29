module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('data_devices', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      type_device: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      site: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      dpto: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
    });

    await queryInterface.createTable('fechas_consultas_devices', {
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

    await queryInterface.createTable('devices', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      host: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      site: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      dpto: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      prtg_name_device: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      prtg_id: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      prtg_sensorname: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      prtg_status: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      prtg_lastup: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      prtg_lastdown: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      cisco_device_ip: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      cisco_device_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      cisco_port: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      cisco_status: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      cisco_reachability: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      cisco_status_device: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      cisco_mac_address: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      red: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("data_devices");
    await queryInterface.dropTable("devices");
    await queryInterface.dropTable("fechas_consultas_devices");
  },
};
