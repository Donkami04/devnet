const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Ap = sequelize.define(
  "Ap",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ip : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "ap",
    timestamps: false,
  }
);

module.exports = { Ap };