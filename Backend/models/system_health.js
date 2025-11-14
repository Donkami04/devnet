const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const SystemHealth= sequelize.define(
  "SystemHealth",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastvalue : {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_prtg : {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    ip_switch: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    name_switch: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    red: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "system_health",
    timestamps: false,
  }
);

module.exports = { SystemHealth };