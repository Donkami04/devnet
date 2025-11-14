const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const DataWan= sequelize.define(
  "DataWan",
  {
    ip: {
      type: DataTypes.STRING(32),
      allowNull: true,
    }
  },
  {
    tableName: "data_wan",
    timestamps: false,
  }
);

module.exports = { DataWan };