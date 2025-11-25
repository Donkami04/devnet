const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const AnilloLorawan = sequelize.define(
  "AnilloLorawan",
  {
    device: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sensor: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_prtg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ip_device: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_device: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    importancia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "anillo_lorawan",
    timestamps: false,
  }
);

module.exports = { AnilloLorawan }