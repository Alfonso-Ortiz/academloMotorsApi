const { Router } = require('express');
const {
  findAllUsers,
  findUserById,
  createUsers,
  updateUsers,
  deleteUsers,
} = require('../controllers/users.controllers');

const router = Router();

router.get('', findAllUsers);

router.get('/:id', findUserById);

router.post('', createUsers);

router.patch('/:id', updateUsers);

router.delete('/:id', deleteUsers);

module.exports = {
  usersRouter: router,
};
