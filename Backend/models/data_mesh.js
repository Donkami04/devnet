const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataMesh= sequelize.define(
  "DataMesh",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    eqmt: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
  },
  {
    tableName: "data_mesh",
    timestamps: false,
  }
);

module.exports = { DataMesh };