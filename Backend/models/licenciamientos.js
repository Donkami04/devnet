const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Licenciamientos = sequelize.define(
  "Licenciamientos",
  {
    equipo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    marca: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    serial: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    expiracion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    expiracion_soporte: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "licenciamientos",
    timestamps: false,
  }
);

module.exports = { Licenciamientos }