// !IMPORTAMOS ROUTER DE EXPRESS
const { Router } = require('express');

// !E IMPORTAMOS LOS METODOS CREADOS EN LOS CONTROLADORES
const {
  findAllRepairs,
  findRepairById,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controllers');

// ! CREAMOS UNA VARIABLE Y LA IGUALAMOS AL ROUTER QUE IMPORTAMOS
const router = Router();

// !Esta ruta me va a encontrar todos los repair, esta ruta viene
// !del archivo servidor que tiene un path repairs y este ruta se dirige hacia
// !el controlador de productos que se llama findAllRepairs
router.get('', findAllRepairs);

// !Esta ruta me va a encontrar un repair dando un id, este id se lo especifico
// !por el path es decir por los parametros de la url, esta ruta viene
// !del archivo servidor que tiene un path repairs y este ruta se dirige hacia
// !el controlador de productos que se llama findRepairById
router.get('/:id', findRepairById);

// !Esta ruta me va a crear un un producto, esta ruta viene
// !del archivo servidor que tiene un path repairs y este ruta se dirige hacia
// !el controlador de productos que se llama createRepair
router.post('', createRepair);

// !Esta ruta me va a actualizar un un producto dado un id, este id se lo especifico
// !por el path es decir por los parametros de la url, esta ruta viene
// !del archivo servidor que tiene un path repairs y este ruta se dirige hacia
// !el controlador de productos que se llama updateRepair
router.patch('/:id', updateRepair);

// !Esta ruta me va a actualizar un producto dando un id, este id se lo especifico
// !por el path es decir por los parametros de la url, esta ruta viene
// !del archivo servidor que tiene un path repairs y este ruta se dirige hacia
// !el controlador de productos que se llama deleteRepair
router.delete('/:id', deleteRepair);

// !EXPORTAMOS CREANDO UNA VARIABLE DANDOLE EL VALOR DE ROUTER, VARIABLE CREADA ARRIBA
module.exports = {
  repairsRouter: router,
};
