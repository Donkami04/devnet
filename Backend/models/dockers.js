const { sequelize } = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Dockers = sequelize.define(
  "Dockers",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cpu_usage_percent: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    memory_usage: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    memory_limit: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "docker_containers",
    timestamps: false,
  }
);


const PrtgDownHistoric = sequelize.define(
  "PrtgDownHistoric",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    downDatetime: {
      type: DataTypes.STRING(225),
      allowNull: true,
      field: "downDatetime",
    },
    upDatetime: {
      type: DataTypes.STRING(225),
      allowNull: true,
      field: "upDatetime",
    },
    duration: {
      type: DataTypes.STRING(225),
      allowNull: true,
    },
  },
  {
    tableName: "historic_prtg_down",
    timestamps: false,
  }
);

module.exports = { Dockers, PrtgDownHistoric };
