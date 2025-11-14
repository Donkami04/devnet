const {sequelize} = require("../db/conection");
const { Sequelize, DataTypes } = require("sequelize");

const NumberUsersVpn = sequelize.define(
  "NumberUsersVpn",
  {
    vpn: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    num_users: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "vpn_number_users",
    timestamps: false,
  }
);

module.exports = { NumberUsersVpn };
