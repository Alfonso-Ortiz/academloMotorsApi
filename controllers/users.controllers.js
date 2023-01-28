// !importamos el modelo
const User = require('../models/user.model');

//! IMPORTANTE!!! TODOS ESTOS CONTROLADORES SE EJECUTAN DE MODO ASINCRONO, POR LO QUE
//! ES IMPORTANTE USAR EL ASYNC - AWAIT

exports.findAllUsers = async (req, res) => {
  try {
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
      message: 'The users has been found successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.findUserById = async (req, res) => {
  try {
    // !importamos el middleware
    const { user } = req;

    // !4. SINO TODO ESTÁ CORRECTO ENVIAMOS LA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'Sucess',
      message: 'The user has been found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.createUsers = async (req, res) => {
  try {
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
      message: 'The user has been create successfully',
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    // !importamos el middleware
    const { user } = req;

    // !2. OBTENER INFORMACIÓN A ACTUALIZAR
    const { name, email } = req.body;

    // !5. SI TODO SALIO BIEN, ACTUALIZAMOS EL USUARIO
    const updatedUser = await user.update({
      name: name,
      email: email,
    });

    // !6. ENVIAMOS LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'sucess',
      message: 'The user has been successfully edited ',
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    // !importamos el middleware
    const { user } = req;

    // !4. ACTUALIZAR EL ESTADO DEL USUARIO A FALSE
    await user.update({ status: false });

    // !5. ENVIAR LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'sucess',
      message: 'The user has been deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
