// !IMPORTAMOS SEQUELIZE
const { DataTypes } = require('sequelize');
// !IMPORTAMOS LA BASE DE DATOS CREADA EN LA CARPETA DATABASE PARA CONECTAR Y ADEMÁS
// !DEFINIRLE LOS TIPOS DE DATOS QUE VAMOS A MANEJA
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
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    enum: ['pending', 'completed', 'canceled'],
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// !EXPORTAMOS EL MODELO DE DATOS
module.exports = Repair;
