const { DataTypes } = require("sequelize");
const { sequelizeDB2 } = require("../db/conection");

const SystemIndicator = sequelizeDB2.define(
  "SystemIndicator",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    system_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    indicator_value: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "system_indicators",
    timestamps: false,
  }
);

module.exports = { SystemIndicator };
