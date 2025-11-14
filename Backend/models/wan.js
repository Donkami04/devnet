const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Wan = sequelize.define(
  "Wan",
  {
    ip: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    sensor: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    last_uptime_days: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    last_uptime_percent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    last_down_days: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    last_down_percent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    current_uptime_percent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    today_uptime_percent: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    tableName: "wan",
    timestamps: false,
  }
);

module.exports = { Wan };
