const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataInfGen = sequelize.define(
  "DataInfGen",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rol: {
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
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "data_inf_gen",
    timestamps: false,
  }
);

module.exports = { DataInfGen };