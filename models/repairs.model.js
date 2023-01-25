// !IMPORTAMOS SEQUELIZE
const { DataTypes } = require('sequelize');
// !IMPORTAMOS LA BASE DE DATOS CREADA EN LA CARPETA DATABASE PARA
// !DEFINIRLE LOS TIPOS DE DATOS QUE VAMOS A MANEJAR
const { db } = require('../database/db');

// !DEFINIMOS LOS TIPOS DE DATOS QUE VAMOS A MANEJAR EN NUESTRA BASE DE DATOS
const Repair = db.define('repair', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// !EXPORTAMOS EL MODELO DE DATOS
module.exports = Repair;
