const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const FimBase = sequelize.define(
  "FimBase",
  {
    base_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    base_ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_prtg: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    status_http: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status_ping: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    tableName: "fim_base",
    timestamps: false,
  }
);

const DatesFimBase = sequelize.define(
  "DatesFimBase",
  {
    base_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    base_ip: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    tableName: "dates_down_fimbase",
    timestamps: false,
  }
);

module.exports = { FimBase, DatesFimBase };
