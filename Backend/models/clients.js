const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const columns = {
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  group: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ip: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  status_prtg: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  lastup_prtg: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  lastdown_prtg: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  device_ip_cisco: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  device_cisco: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  port_cisco: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status_cisco: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  reachability_cisco: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  id_prtg: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  importancia: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  clave: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status_device_cisco: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  data_backup: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
};

const Candelaria_Clients = sequelize.define("Candelaria_Clients", columns, {
  tableName: "candelaria_clients",
  timestamps: false,
});

const Desaladora_Clients = sequelize.define("Desaladora_Clients", columns, {
  tableName: "desaladora_clients",
  timestamps: false,
});

module.exports = { Candelaria_Clients, Desaladora_Clients };
