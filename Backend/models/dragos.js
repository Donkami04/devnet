const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Dragos = sequelize.define(
  "Dragos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    interface: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_prtg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "dragos",
    timestamps: false,
  }
);

module.exports = { Dragos }