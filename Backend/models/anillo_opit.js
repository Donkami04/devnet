const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const AnilloOpit = sequelize.define(
  "AnilloOpit",
  {
    device: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sensor: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_prtg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ip_device: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_device: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "anillo_opit",
    timestamps: false,
  }
);

module.exports = { AnilloOpit }