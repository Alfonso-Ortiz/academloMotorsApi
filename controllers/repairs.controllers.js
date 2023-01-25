// !importamos el modelo
const Repair = require('../models/repairs.model');

// !ACÁ CREAMOS LOS METODOS QUE USAREMOS TANTO PARA PEDIR, ENVIAR
// !EDITAR O ELIMINAR INFORMACIÓN, METODOS QUE EXPORTAREMOS A LAS
// !ROUTES

exports.findAllRepairs = async (req, res) => {
  // !1. BUSCAMOS TODOS LAS REPAIRS, NO ES NECESARIO DESESTRUCTURAR
  const repairs = await Repair.findAll({
    // !2. BUSCAMOS LOS QUE SU STATUS SEA TRUE, ES DECIR AVAILABLE
    where: {
      status: true,
    },
  });

  // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'The repairs has been found successfull',
    repairs,
  });
};

exports.findRepairById = async (req, res) => {
  // !1. RECIBIMOS EL ID PASADO POR PARAMETROS
  const { id } = req.params;

  // !2. BUSCAMOS EL REPAIR CON DICHO ID Y QUE SU STATUS SEA TRUE
  const repair = await Repair.findOne({
    where: {
      id,
      status: true,
    },
  });

  // !3. SI EL ID ES NULL O NO EXISTE ENVIAMOS ESTE ERROR
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }

  // !4. SINO TODO ESTÁ CORRECTO ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'The repair has been found successfull',
  });
};

exports.createRepair = async (req, res) => {
  // !1. RECIBIMOS LA INFORMACIÓN QUE QUEREMOS RECIBIR Y QUE VIENE EN EL CUERPO
  const { date, userId } = req.body;

  // !2. CREAMOS EL REPAIR CON LA INFORMACIÓN RECIBIDA POR LA REQ
  const newRepair = await Repair.create({
    date,
    userId,
  });

  // !3. Y ENVIAMOS LA RESPUESTA AL CLIENTE
  res.status(201).json({
    status: 'sucess',
    message: 'The repair has been created successfull',
    newRepair,
  });
};

exports.updateRepair = async (req, res) => {
  // !1. OBTENGO EL ID
  const { id } = req.params;

  // !2. OBTENER INFORMACIÓN A ACTUALIZAR
  const { date, userId } = req.body;

  // !3. BUSCAMOS EL PRODUCTO A ACTUALIZAR
  const repair = await Repair.findOne({
    id,
  });

  // !4. SI NO EXISTE PRODUCTO ENVIAMOS ERROR
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }

  // !5. SI TODO SALIO BIEN, ACTUALIZAMOS EL PRODUCTO
  const updatedRepair = await repair.update({
    date,
    userId,
  });

  // !6. ENVIAMOS LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'The repair has been successfull edited',
    updatedRepair,
  });
};

exports.deleteRepair = async (req, res) => {
  // !1. OBTENGO EL ID DE LA REQ.PARAMS
  const { id } = req.params;

  // !2. BUSCAR EL PRODUCTO A ELIMINAR
  const deleteRepair = await Repair.findOne({
    where: {
      id,
      status: true,
    },
  });

  // !3. ENVIAR UN ERROR SI EL PRODUCTO NO SE ENCUENTRA
  if (!deleteRepair) {
    return res.status(404).json({
      status: 'error',
      message: 'The repair was not found',
    });
  }

  // !4. ACTUALIZAR EL ESTADO DEL PRODUCTO A FALSE
  await deleteRepair.update({ status: false });
  //await product.destroy();

  // !5. ENVIAR LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'sucess',
    message: 'The repair has been successfull removed',
  });
};
