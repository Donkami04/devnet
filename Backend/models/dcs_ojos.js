const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const ClientsOjos = sequelize.define(
  "ClientsOjos",
  {
    name: {
      type: DataTypes.STRING(100),
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
    status_device_cisco: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    data_backup: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    tableName: "clients_ojos",
    timestamps: false,
  }
);

module.exports = {ClientsOjos};
