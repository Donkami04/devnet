const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const columns = {
  fw: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(225),
    allowNull: true,
  },
  ip_lan: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ip_origin: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  datetime: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
};

const VpnCandelaria = sequelize.define("VpnCandelaria", columns, {
  tableName: "vpn_candelaria",
  timestamps: false,
});

module.exports = { VpnCandelaria }