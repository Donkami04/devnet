const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DateTimeSystems= sequelize.define(
  "DateTimeSystems",
  {
    system_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    datetime: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  },
  {
    tableName: "datetime_systems",
    timestamps: false,
  }
);

module.exports = {DateTimeSystems};