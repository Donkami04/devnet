const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataMeshActility= sequelize.define(
  "DataMeshActility",
  {
    eui: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    tableName: "data_mesh_actility",
    timestamps: false,
  }
);

module.exports = { DataMeshActility };