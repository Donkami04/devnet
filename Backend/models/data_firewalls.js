const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataFirewalls = sequelize.define(
  "DataFirewalls",
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    channel: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    vdom: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    gateway: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    ubication: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
  },
  {
    tableName: "data_firewalls",
    timestamps: false,
  }
);

module.exports = {DataFirewalls};