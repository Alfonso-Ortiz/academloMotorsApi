const AppError = require('../helpers/appError');

const handleCastError22P02 = () =>
  new AppError('Some type of data send does not match was expected', 400);

const handleJWTError = () =>
  new AppError('Invalid token. Please login again!', 401);

const habdleJWTExpiredError = () =>
  new AppError('Your token has expired, please login again', 401);

const sendErroDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErroProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 🧨', err);
    res.status(500).json({
      status: 'Fail',
      message: 'Something went wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  //obtenemos el código de estado y lo igualamos al mismo y si no viene ningún 400 define 500
  err.statusCode = err.statusCode || 500;

  // iguamente obtenemos el status y lo igualamos al mismo y si no viene error define fail
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErroDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (!error.parent?.code) {
      error = err;
    }

    if (error.parent?.code === '22P02') error = handleCastError22P02(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    sendErroProd(error, res);

    if (error.name === 'TokenExpiredError')
      error = habdleJWTExpiredError(error);
  }
};

module.exports = globalErrorHandler;
