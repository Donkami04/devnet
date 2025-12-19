const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/conection");

const SlaHistorico = sequelize.define(
  "SlaHistorico",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    system: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sla: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "sla_historicos",
    timestamps: false,
  }
);

module.exports = {SlaHistorico};
