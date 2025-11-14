const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const FlotacionOt = sequelize.define(
  "FlotacionOt",
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    device_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sensor: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "flotacion_ot",
    timestamps: false,
  }
);

module.exports = { FlotacionOt }