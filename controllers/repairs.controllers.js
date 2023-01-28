// !importamos el modelo
const { validRepairExists } = require('../middlewares/repair.middleware');
const Repair = require('../models/repairs.model');

// !ACÁ CREAMOS LOS METODOS QUE USAREMOS TANTO PARA PEDIR, ENVIAR
// !EDITAR O ELIMINAR INFORMACIÓN, METODOS QUE EXPORTAREMOS A LAS
// !ROUTES

exports.findAllRepairs = async (req, res) => {
  try {
    // !1. BUSCAMOS TODOS LAS REPAIRS, NO ES NECESARIO DESESTRUCTURAR
    const repairs = await Repair.findAll({
      // !2. BUSCAMOS LOS QUE SU STATUS SEA TRUE, ES DECIR AVAILABLE
      where: {
        status: 'pending',
      },
    });

    // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'sucess',
      message: 'The repairs has been found successfully',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.findRepairById = async (req, res) => {
  try {
    // !importamos el middleware
    const { repair } = req;

    // !4. SINO TODO ESTÁ CORRECTO ENVIAMOS LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'sucess',
      message: 'The repair has been found successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    // !1. RECIBIMOS LA INFORMACIÓN QUE QUEREMOS RECIBIR Y QUE VIENE EN EL CUERPO
    const { date, userId } = req.body;

    // !2. CREAMOS EL REPAIR CON LA INFORMACIÓN RECIBIDA POR LA REQ
    const newRepair = await Repair.create({
      date,
      userId,
    });

    // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
    return res.status(201).json({
      status: 'sucess',
      message: 'The repair has been created successfully',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    // !importamos el modelo
    const { repair } = req;

    // !OBTENER INFORMACIÓN A ACTUALIZAR
    const { status } = req.body;

    // !SI TODO SALIO BIEN, ACTUALIZAMOS EL PRODUCTO
    const updatedRepair = await repair.update({
      status,
    });

    // !ENVIAMOS LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'Sucess',
      message: 'The repair has been successfully edited ',
      updatedRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    // !importamos el middleware
    const { repair } = req;

    // !ACTUALIZAR EL ESTADO DEL PRODUCTO A FALSE
    await repair.update({ status: 'cancelled' });

    // !ENVIAR LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'sucess',
      message: 'The repair has been successfully removed',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
