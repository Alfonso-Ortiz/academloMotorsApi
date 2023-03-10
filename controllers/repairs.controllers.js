// !importamos el modelo
const catchAsync = require('../helpers/catchAsync');
const Repair = require('../models/repairs.model');
const User = require('../models/user.model');

// !ACÁ CREAMOS LOS METODOS QUE USAREMOS TANTO PARA PEDIR, ENVIAR
// !EDITAR O ELIMINAR INFORMACIÓN, METODOS QUE EXPORTAREMOS A LAS
// !ROUTES

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  // !1. BUSCAMOS TODOS LAS REPAIRS, NO ES NECESARIO DESESTRUCTURAR
  const repairs = await Repair.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    // !2. BUSCAMOS LOS QUE SU STATUS SEA TRUE, ES DECIR AVAILABLE
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: ['name', 'email'],
      },
    ],
  });

  // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'Success',
    message: 'The repairs has been found successfully',
    repairs,
  });
});

exports.findRepairById = catchAsync(async (req, res, next) => {
  // !importamos el middleware
  const { repair } = req;

  // !4. SINO TODO ESTÁ CORRECTO ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'Success',
    message: 'The repair has been found successfully',
    repair,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  // !1. RECIBIMOS LA INFORMACIÓN QUE QUEREMOS RECIBIR Y QUE VIENE EN EL CUERPO
  const { date, userId, motorsNumber, description } = req.body;

  // !2. CREAMOS EL REPAIR CON LA INFORMACIÓN RECIBIDA POR LA REQ
  const newRepair = await Repair.create({
    date,
    userId,
    motorsNumber,
    description,
  });

  // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(201).json({
    status: 'Success',
    message: 'The repair has been created successfully',
    newRepair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  // !OBTENER INFORMACIÓN A ACTUALIZAR
  const { status } = req.body;

  // !importamos el modelo
  const { repair } = req;

  // !SI TODO SALIO BIEN, ACTUALIZAMOS EL PRODUCTO
  await repair.update({ status });

  // !ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'Success',
    message: 'The repair has been updated successfully ',
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  // !importamos el middleware
  const { repair } = req;

  // !ACTUALIZAR EL ESTADO DEL PRODUCTO A FALSE
  await repair.update({ status: 'cancelled' });

  // !ENVIAR LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'Success',
    message: 'The repair has been successfully removed',
  });
});
