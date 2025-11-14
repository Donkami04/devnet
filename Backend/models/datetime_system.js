const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DateTimeSystems = sequelize.define(
  "DateTimeSystems",
  {
    system_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    datetime: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  },
  {
    tableName: "datetime_systems",
    timestamps: false,
  }
);

module.exports = { DateTimeSystems };
