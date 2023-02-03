const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateJWT = require('../helpers/jwt');
const AppError = require('../helpers/appError');

exports.createUsers = catchAsync(async (req, res, next) => {
  // !1. RECIBIMOS LA INFORMACIÓN QUE QUEREMOS RECIBIR Y QUE VIENE EN EL CUERPO
  const { name, email, password, role = 'user' } = req.body;

  // !2. CREAMOS UNA INSTANCIA DE LA CLASE USER
  const user = new User({ name, email, password, role });

  // !3. CREAMOS UNA INSTANCIA DE LA CALSE USER
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // !4. GUARDAR EN LA BASE DE DATOS CON LAS CONTRASEÑAS ENCRYPTADAS
  await user.save();

  // !5. GUARDAR EN LA BASE DE DATOS CON LAS CONTRASEÑAS ENCRYPTADAS
  const token = await generateJWT(user.id);

  // !6. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'Success',
    message: 'User has been create successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // recibimos la info de la req.body
  const { email, password } = req.body;

  // verificar si user existe y la contraseña es correcta
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'enabled',
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //2. si todo está bien, enviamos el token al cliente
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'Login successfully',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
});
