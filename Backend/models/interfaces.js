const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Interfaces= sequelize.define(
  "Interfaces",
  {
    name: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_prtg : {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    ip_switch: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name_switch: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    red: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "interfaces",
    timestamps: false,
  }
);

module.exports = { Interfaces };