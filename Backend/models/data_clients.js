const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataClient = sequelize.define(
  "DataClients",
  {
    group: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    importancia: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    clave: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "data_clients",
    timestamps: false,
  }
);

module.exports = { DataClient };
