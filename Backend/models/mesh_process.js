const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const MeshClients = sequelize.define(
  "MeshClients",
  {
    ubication: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    device: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_mac: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    current_mac: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_change_date: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    prtg_status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    prtg_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_num_clients: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "mesh_process",
    timestamps: false,
  }
);

module.exports = { MeshClients };
