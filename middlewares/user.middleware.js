const User = require('../models/user.model');
const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');

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
    return next(new AppError('User already exists', 400));
  }

  next();
});
