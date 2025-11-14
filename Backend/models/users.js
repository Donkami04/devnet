const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = { Users };
