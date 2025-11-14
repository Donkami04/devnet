const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const StatusCores = sequelize.define(
  "StatusCores",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    red: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "status_cores",
    timestamps: false,
  }
);

module.exports = { StatusCores };
