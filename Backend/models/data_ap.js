const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataAp= sequelize.define(
  "DataAp",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ip : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    tableName: "data_ap",
    timestamps: false,
  }
);

module.exports = { DataAp };