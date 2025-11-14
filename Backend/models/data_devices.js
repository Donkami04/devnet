const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataDevices= sequelize.define(
  "DataDevices",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type_device: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    site: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dpto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    red: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "data_devices",
    timestamps: false,
  }
);

module.exports = { DataDevices }
