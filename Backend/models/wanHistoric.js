const { sequelize, sequelizeDB2 } = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const columns = {
  ip: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  sensor: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  uptime_percent: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  uptime: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  downtime: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  datetime: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
};

const WanHistoric = sequelizeDB2.define("HistoricWan", columns, {
  tableName: "wan",
  timestamps: false,
});

module.exports = { WanHistoric };
