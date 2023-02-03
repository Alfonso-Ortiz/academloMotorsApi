const User = require('../models/user.model');
const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const bcrypt = require('bcryptjs');

exports.validUserExists = catchAsync(async (req, res, next) => {
  // !1. RECIBIMOS EL ID PASADO POR PARAMETROS
  const { id } = req.params;

  // !2. BUSCAMOS EL USUARIO CON DICHO ID Y QUE SU STATUS SEA TRUE
  const user = await User.findOne({
    where: {
      id,
      status: 'enabled',
    },
  });

  // !3. SI EL ID ES NULL O NO EXISTE ENVIAMOS ESTE ERROR
  if (!user) {
    return next(new AppError('User was not found', 404));
  }

  req.user = user;
  next();
});

exports.validEmailExists = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (user && user.status === 'disabled') {
    await user.update({ status: 'enabled' });
    return res.status(200).json({
      status: 'Success',
      message: 'The user has been enabled',
    });
  }

  if (user) {
    return next(new AppError('User email already exists', 400));
  }

  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // recibimos el usuario validado en el middleware
  const { user } = req;

  // recibimos por el body la contraseña vieja que se va a comparar y la contraseña nueva
  const { currentPassword, newPassword } = req.body;

  // comparamos las contraseñas con el bcrypt, que la actual sea la que está en al base de datos
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  // encriptamos la nueva contraseña
  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(newPassword, salt);

  // actualizamos la contraseña
  await user.update({
    password: encriptedPassword,
    passwordChangedAt: new Date(),
  });

  // enviamos la respuesta
  res.status(200).json({
    status: 'Success',
    message: 'Password was updated successfully',
  });
});
