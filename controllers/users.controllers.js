// !importamos el modelo
const User = require('../models/user.model');
const catchAsync = require('../helpers/catchAsync');

//! IMPORTANTE!!! TODOS ESTOS CONTROLADORES SE EJECUTAN DE MODO ASINCRONO, POR LO QUE
//! ES IMPORTANTE USAR EL ASYNC - AWAIT

exports.findAllUsers = catchAsync(async (req, res) => {
  // !1. BUSCAMOS TODOS LOS USUARIOS, NO ES NECESARIO DESESTRUCTURAR
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'role'],
    // !2. BUSCAMOS LOS QUE SU STATUS SEA TRUE, ES DECIR AVAILABLE
    where: {
      status: 'enabled',
    },
  });

  // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'Success',
    message: 'Users has been found successfully',
    users,
  });
});

exports.findUserById = catchAsync(async (req, res) => {
  // !importamos el middleware
  const { user } = req;

  // !4. SINO TODO ESTÁ CORRECTO ENVIAMOS LA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'Success',
    message: 'User has been found successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.updateUsers = catchAsync(async (req, res) => {
  // ! OBTENER INFORMACIÓN A ACTUALIZAR
  const { name, email } = req.body;

  // !importamos el middleware
  const { user } = req;

  // ! SI TODO SALIO BIEN, ACTUALIZAMOS EL USUARIO
  await user.update({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
  });

  // ! ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'Success',
    message: 'User has been updated successfully ',
  });
});

exports.deleteUsers = catchAsync(async (req, res) => {
  // !importamos el middleware
  const { user } = req;

  // !4. ACTUALIZAR EL ESTADO DEL USUARIO A FALSE
  await user.update({ status: 'disabled' });

  // !5. ENVIAR LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'Success',
    message: 'User has been deleted successfully',
  });
});
