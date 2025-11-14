const {sequelize, sequelizeDB2} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const columns = {
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  channel: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ip: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  vdom: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  gateway: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  num_users: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  packet_loss: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  latency: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  jitter: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  failed_before: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  datetime: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  ubication: {
    type: DataTypes.STRING(32),
    allowNull: true,
  },
  status_gateway: {
    type: DataTypes.STRING(32),
    allowNull: true,
  }
}

const Firewalls = sequelize.define(
  "Firewalls",
  columns,
  {
    tableName: "firewalls",
    timestamps: false,
  }
);

const HistoricFirewalls = sequelizeDB2.define(
  "HistoricFirewalls",
  columns,
  {
    tableName: "firewalls",
    timestamps: false,
  }
);

module.exports = {Firewalls, HistoricFirewalls};