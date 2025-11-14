const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const GroupPrtg = sequelize.define(
  "GroupPrtg",
  {
    device: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    group: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_prtg : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sensor: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastvalue: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    tableName: "prtg_groups",
    timestamps: false,
  }
);

module.exports = { GroupPrtg }