const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const Mesh = sequelize.define(
  "Mesh",
  {
    ip: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ping_avg: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    minimo: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    maximo: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    packet_loss: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    lastvalue: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lastup: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lastdown: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nivel_senal: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ruido_senal: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tiempo_conexion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    conectado_a: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status_dispatch: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    operador: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    snr: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    id_prtg: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fail_senal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fail_time_senal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fail_snr: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fail_time_snr: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    datetime: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "mesh",
    timestamps: false,
  }
);

module.exports = {Mesh};