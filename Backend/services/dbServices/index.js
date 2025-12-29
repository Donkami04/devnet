const { sequelize, sequelizeDevelopment } = require("../../db/conection");
const { QueryTypes } = require("sequelize");

class RawSQLService {
  /**
   * Ejecuta consultas SELECT
   * @param {string} sql - Consulta SQL
   * @param {object} params - Parámetros (replacements)
   */
  async select(sql, params = {}) {
    try {
      const rows = await sequelize.query(sql, {
        replacements: params,
        type: QueryTypes.SELECT,
      });

      return rows;
    } catch (error) {
      console.error("Error en SELECT:", error);
      throw new Error("Error ejecutando consulta SELECT");
    }
  }

  /**
   * Ejecuta consultas SELECT en la base de datos de desarrollo
   * @param {string} sql - Consulta SQL
   * @param {object} params - Parámetros (replacements)
   */
  async selectDevelopment(sql, params = {}) {
    try {
      const rows = await sequelizeDevelopment.query(sql, {
        replacements: params,
        type: QueryTypes.SELECT,
      });

      return rows;
    } catch (error) {
      console.error("Error en SELECT:", error);
      throw new Error("Error ejecutando consulta SELECT");
    }
  }

  /**
   * Ejecuta INSERT, UPDATE, DELETE u otras operaciones RAW
   * @param {string} sql - Consulta SQL
   * @param {object} params - Parámetros (replacements)
   */
  async execute(sql, params = {}) {
    try {
      const result = await sequelize.query(sql, {
        replacements: params,
        type: QueryTypes.RAW,
      });

      return result;
    } catch (error) {
      console.error("Error en EXECUTE:", error);
      throw new Error("Error ejecutando consulta SQL");
    }
  }
}

module.exports = new RawSQLService();
