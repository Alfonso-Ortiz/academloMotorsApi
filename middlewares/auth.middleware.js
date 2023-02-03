const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user.model');

exports.protect = catchAsync(async (req, res, next) => {
  // obtener el token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! please loggin to get access', 401)
    );
  }
  // verificar el token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  // verificar si el usuario existe
  const user = await User.findOne({
    id: decoded.id,
    status: true,
  });

  if (!user) {
    return next(
      new AppError('Owner of this token it not longer available', 401)
    );
  }

  //verificar si el usuario ha cambiado al contraseña después enviado el token
  next();
});
