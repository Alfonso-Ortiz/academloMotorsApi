// !importamos el modelo
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user.model');

//! IMPORTANTE!!! TODOS ESTOS CONTROLADORES SE EJECUTAN DE MODO ASINCRONO, POR LO QUE
//! ES IMPORTANTE USAR EL ASYNC - AWAIT

exports.findAllUsers = catchAsync(async (req, res) => {
  // !1. BUSCAMOS TODOS LOS USUARIOS, NO ES NECESARIO DESESTRUCTURAR
  const users = await User.findAll({
    // !2. BUSCAMOS LOS QUE SU STATUS SEA TRUE, ES DECIR AVAILABLE
    where: {
      status: 'enabled',
    },
  });

  // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'Users has been found successfully',
    users,
  });
});

exports.findUserById = catchAsync(async (req, res) => {
  // !importamos el middleware
  const { user } = req;

  // !4. SINO TODO ESTÁ CORRECTO ENVIAMOS LA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'Sucess',
    message: 'User has been found successfully',
    user,
  });
});

exports.createUsers = catchAsync(async (req, res) => {
  // !1. RECIBIMOS LA INFORMACIÓN QUE QUEREMOS RECIBIR Y QUE VIENE EN EL CUERPO
  const { name, email, password, role } = req.body;

  // !2. CREAMOS EL USUARION CON LA INFORMACIÓN RECIBIDA POR LA REQ
  const newUser = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });

  // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'User has been create successfully',
    newUser,
  });
});

exports.updateUsers = catchAsync(async (req, res) => {
  // !importamos el middleware
  const { user } = req;

  // !2. OBTENER INFORMACIÓN A ACTUALIZAR
  const { name, email } = req.body;

  // !5. SI TODO SALIO BIEN, ACTUALIZAMOS EL USUARIO
  const updatedUser = await user.update({
    name,
    email,
  });

  // !6. ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'User has been successfully edited ',
    updatedUser,
  });
});

exports.deleteUsers = catchAsync(async (req, res) => {
  // !importamos el middleware
  const { user } = req;

  // !4. ACTUALIZAR EL ESTADO DEL USUARIO A FALSE
  await user.update({ status: 'disabled' });

  // !5. ENVIAR LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'User has been deleted successfully',
  });
});
