'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('csp', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
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
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
    });

    await queryInterface.createTable('css', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
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
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
      
    });

    await queryInterface.createTable('cnp', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
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
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
      
    });

    await queryInterface.createTable('cns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
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
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
      
    });

    await queryInterface.createTable('hse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
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
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
      
    });

    await queryInterface.createTable('cnpb', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
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
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
      
    });

    await queryInterface.createTable('cnsb', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(10),
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
      importancia: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status_device_cisco: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      data_backup: {
        type: Sequelize.STRING(10),
        allowNull: true,
      }
      
    });

    await queryInterface.createTable('switches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dispositivo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      tipo: {
        type: Sequelize.STRING(50),
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
      reachability: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ups1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ups2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status_ups1: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status_ups2: {
        type: Sequelize.STRING(50),
        allowNull: true,
      }
    });

    await queryInterface.createTable('data_clients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      group: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      importancia: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      clave: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });

    await queryInterface.createTable('data_switches', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      dispositivo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      group: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });

    await queryInterface.createTable('fechas_consultas_clientes', {
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

    await queryInterface.createTable('fechas_consultas_switches', {
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

    await queryInterface.createTable('fechas_consultas_vpn', {
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

    await queryInterface.createTable('data_ups', {
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
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: true,
      }
    });

    await queryInterface.createTable('ups', {
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
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_prtg: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_ups: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      batery: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_ups: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      uptime: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      ubication: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    });

    await queryInterface.createTable('fechas_consultas_ups', {
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

    await queryInterface.createTable('vpn_1', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      ip_lan: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip_origin: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      datetime: {
        type: Sequelize.STRING(100),
        allowNull: true,
      }
    });
    
    await queryInterface.createTable('vpn_2', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      ip_lan: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip_origin: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      datetime: {
        type: Sequelize.STRING(100),
        allowNull: true,
      }
    });

    await queryInterface.createTable('vpn_3', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(225),
        allowNull: true,
      },
      ip_lan: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ip_origin: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      datetime: {
        type: Sequelize.STRING(100),
        allowNull: true,
      }
    });

    await queryInterface.createTable('vpn_number_users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      vpn: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      num_users: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    await queryInterface.createTable('data_mesh', {
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
      device: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      eqmt: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
    });

    await queryInterface.createTable('fechas_consultas_mesh', {
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

    await queryInterface.createTable('mesh', {
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
      device: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ping_avg: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      minimo: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      maximo: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      packet_loss: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      lastvalue: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      lastup: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      lastdown: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nivel_senal: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ruido_senal: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      tiempo_conexion: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      conectado_a: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status_dispatch: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      operador: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      snr: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      id_prtg: {
        type: Sequelize.STRING(32),
        allowNull: true,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('csp');
    await queryInterface.dropTable('css');
    await queryInterface.dropTable('cnp');
    await queryInterface.dropTable('cns');
    await queryInterface.dropTable('hse');
    await queryInterface.dropTable('cnpb');
    await queryInterface.dropTable('cnsb');
    await queryInterface.dropTable('switches');
    await queryInterface.dropTable('data_switches');
    await queryInterface.dropTable('data_clients');
    await queryInterface.dropTable('fechas_consultas_switches');
    await queryInterface.dropTable('fechas_consultas_clientes');
    await queryInterface.dropTable('fechas_consultas_ups');
    await queryInterface.dropTable('fechas_consultas_vpn');
    await queryInterface.dropTable('fechas_consultas_mesh');
    await queryInterface.dropTable('fechas_consultas_devices');
    await queryInterface.dropTable('data_ups');
    await queryInterface.dropTable('ups');
    await queryInterface.dropTable('vpn_1');
    await queryInterface.dropTable('vpn_2');
    await queryInterface.dropTable('vpn_3');
    await queryInterface.dropTable('vpn_number_users');
    await queryInterface.dropTable('data_mesh');
    await queryInterface.dropTable('mesh');
    await queryInterface.dropTable('devices');
    await queryInterface.dropTable('data_devices');
  },
};
