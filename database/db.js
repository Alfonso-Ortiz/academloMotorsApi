// !SE IMPORTA SEQUELIZE PARA LA BASE DE DATOS
const { Sequelize } = require('sequelize');

// !IGUALAMOS DB A UNA NUEVA BASE DE DATOS DÓNDE LE DAREMOS EL DIALECTO
// !EL PUERTO, LOS DATOS DEL PGADMIN Y EL NOMBRE DE LA BASE DE DATOS
// !CREADA EN EL PG ADMINdejamo
const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'academloMotors',
  logging: false,
});

// !EXPORTAMOS DB PARA PODER IMPORTARLA TANTO EN LOS MODELOS COMO EN EL SERVIDOR
module.exports = { db };
