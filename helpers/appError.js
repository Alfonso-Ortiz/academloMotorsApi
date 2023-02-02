// creamos una clase appError, y el error se guarda todo el stack de errores que hay en consola
class AppError extends Error {
  // recibimos el mensaje y el código que pasaremos
  constructor(message, statusCode) {
    // super ejecuta el constructor de la clase padre es decir, de Error
    super(message);

    // this es una clase, con propiedades que le igualaremos el statusCode del constructor
    this.statusCode = statusCode;

    // usamos el ternario para validad si el error inicia con un determinado número
    this.status = `${statusCode}`.startsWith('4') ? 'Error' : 'Fail';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
