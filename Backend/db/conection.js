require('dotenv').config();
const { Sequelize } = require("sequelize");
const config = require("../config/config");

const environment = process.env.ENVIRONMENT || 'local';
const dbConfig = config[environment];

// Primera conexión (base de datos 1)
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql',
    logging: false,
  }
);

// Segunda conexión (base de datos 2)
const dbHistoric = config.historic;  // Configuración para la segunda base de datos
const sequelizeDB2 = new Sequelize(
  dbHistoric.database,
  dbHistoric.username,
  dbHistoric.password,
  {
    host: dbHistoric.host,
    dialect: 'mysql',
    logging: false,
    timezone: "America/Santiago",
  }
);

// Tercera (Desarrollo) conexión (base de datos 2)
const dbDesarrollo = config.development;  // Configuración para la tercera base de datos
const sequelizeDevelopment = new Sequelize(
  dbDesarrollo.database,
  dbDesarrollo.username,
  dbDesarrollo.password,
  {
    host: dbDesarrollo.host,
    dialect: 'mysql',
    logging: false,
  }
);

// Función para verificar ambas conexiones a las bases de datos
async function checkDatabaseConnections() {
  try {
    await sequelize.authenticate();
    await sequelizeDevelopment.authenticate();
    console.log(`Conexión a la base de datos del entorno ${environment} exitosa.`);
    
    await sequelizeDB2.authenticate();
    console.log("Conexión a la base de datos historicos exitosa");
  } catch (error) {
    console.error("Error al conectarse a alguna de las base de datos:", error);
  }
}

checkDatabaseConnections();

// Exportar ambas conexiones
module.exports = {
  sequelize,
  sequelizeDB2,
  sequelizeDevelopment
};
