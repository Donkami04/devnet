const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Ap = sequelize.define(
  "Ap",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_disconnect_reason: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name_switch: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "ap",
    timestamps: false,
  }
);

module.exports = { Ap };
