// !IMPORTAMOS EXPRESS
const express = require('express');
// !IMPORTAMOS LAS CORS PARA PERMITIR ACCESO A LA API
const cors = require('cors');
// !IMPORTAMOS LAS RUTAS QUE VIENEN DE ROUTES
const { usersRouter } = require('../routes/users.routes');
const { repairsRouter } = require('../routes/repairs.routes');
// !IMPORTAMOS LA BASE DE DATOS CREADA EN LA CARPETA DATABASE
const { db } = require('../database/db');
const morgan = require('morgan');

// !1. CREAMOS UNA CLASE

class Server {
  constructor() {
    // !DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
    this.app = express();
    // !DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 3000;

    // !DEFINIMOS LOS PATHS DE NUESTRA APLICACIÓN
    this.paths = {
      users: '/api/v1/users',
      repairs: '/api/v1/repairs',
    };

    // !LLAMO EL METODO DE CONEXION A LA BASE DE DATOS
    this.database();

    // !INVOCAMOS EL METODO MIDDLEWARES
    this.middlewares();

    // !INVOCAMOS EL METODO ROUTES
    this.routes();
  }

  // !MIDDLEWARES
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    // !UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    // !UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  // !RUTAS
  routes() {
    // !utilizar las rutas de usuarios
    this.app.use(this.paths.users, usersRouter);
    // !utilizar las rutas de repairs
    this.app.use(this.paths.repairs, repairsRouter);
  }

  // !CONEXIÓN A LA BASE DE DATOS
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  // !METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

// !2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
