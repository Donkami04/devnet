const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const GroupPrtgDownDatetimes = sequelize.define(
  "GroupPrtgDownDatetimes",
  {
    id_prtg: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    datetime: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "prtg_groups_down_datetimes",
    timestamps: false,
  }
);

module.exports = { GroupPrtgDownDatetimes };