const { sequelize } = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Mra = sequelize.define(
  "Mra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
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
  },
  {
    tableName: "mra",
    timestamps: false,
  }
);

module.exports = { Mra };
