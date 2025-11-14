const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const RouteDefault= sequelize.define(
  "RouteDefault",
  {
    via_bgp: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    name_switch: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    red: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ip_switch: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    tableName: "route_default",
    timestamps: false,
  }
);

module.exports = { RouteDefault };