const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataSwitches = sequelize.define(
  "DataSwitches",
  {
    dispositivo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    group: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "data_switches",
    timestamps: false,
  }
);

module.exports = { DataSwitches };