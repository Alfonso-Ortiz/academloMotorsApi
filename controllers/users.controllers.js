// !importamos el modelo
const User = require('../models/user.model');

//! IMPORTANTE!!! TODOS ESTOS CONTROLADORES SE EJECUTAN DE MODO ASINCRONO, POR LO QUE
//! ES IMPORTANTE USAR EL ASYNC - AWAIT

exports.findAllUsers = async (req, res) => {
  // !1. BUSCAMOS TODOS LOS USUARIOS, NO ES NECESARIO DESESTRUCTURAR
  const users = await User.findAll({
    // !2. BUSCAMOS LOS QUE SU STATUS SEA TRUE, ES DECIR AVAILABLE
    where: {
      status: true,
    },
  });
  return res.status(200).json({
    status: 'sucess',
    message: 'The user has been found successfull',
    users,
  });
};

exports.findUserById = async (req, res) => {
  // !1. RECIBIMOS EL ID PASADO POR PARAMETROS
  const { id } = req.params;

  // !2. BUSCAMOS EL USUARIO CON DICHO ID Y QUE SU STATUS SEA TRUE
  const user = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  // !3. SI EL ID ES NULL O NO EXISTE ENVIAMOS ESTE ERROR
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }

  // !4. SINO TODO ESTÁ CORRECTO ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'The user has been found successfull',
    user,
  });
};

exports.createUsers = async (req, res) => {
  // !1. RECIBIMOS LA INFORMACIÓN QUE QUEREMOS RECIBIR Y QUE VIENE EN EL CUERPO
  const { name, email, password } = req.body;

  // !2. CREAMOS EL USUARION CON LA INFORMACIÓN RECIBIDA POR LA REQ
  const newUser = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  res.status(201).json({
    status: 'sucess',
    message: 'The user has been create successfull',
    newUser,
  });
};

exports.updateUsers = async (req, res) => {
  // !1. OBTENGO EL ID
  const { id } = req.params;

  // !2. OBTENER INFORMACIÓN A ACTUALIZAR
  const { name, email, password } = req.body;

  // !3. BUSCAMOS EL PRODUCTO A ACTUALIZAR
  const user = await User.findOne({
    id,
  });

  // !4. SI NO EXISTE PRODUCTO ENVIAMOS ERROR
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }

  // !5. SI TODO SALIO BIEN, ACTUALIZAMOS EL PRODUCTO
  const updatedUser = await user.update({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  // !6. ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'The user has been successfull edited ',
    updatedUser,
  });
};

exports.deleteUsers = async (req, res) => {
  // !1. OBTENGO EL ID DE LA REQ.PARAMS
  const { id } = req.params;

  // !2. BUSCAR EL PRODUCTO A ELIMINAR
  const deleteUser = await User.findOne({
    where: {
      id,
      status: true,
    },
  });

  // !3. ENVIAR UN ERROR SI EL PRODUCTO NO SE ENCUENTRA
  if (!deleteUser) {
    return res.status(404).json({
      status: 'error',
      message: 'The user was not found',
    });
  }

  // !4. ACTUALIZAR EL ESTADO DEL PRODUCTO A FALSE
  await deleteUser.update({ status: false });

  // !5. ENVIAR LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'The user has been successfull removed',
  });
};
