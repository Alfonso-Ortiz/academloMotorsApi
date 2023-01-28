const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findUserById,
  createUsers,
  updateUsers,
  deleteUsers,
} = require('../controllers/users.controllers');
const {
  validUserExists,
  validEmailExists,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('', findAllUsers);

router.get('/:id', validUserExists, findUserById);

router.post(
  '',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Email is require').not().isEmpty(),
    check('email', 'Email has to be a correct format').isEmail(),
    check('password', 'Password is require').not().isEmpty(),
    check('role', 'Role is require').not().isEmpty(),
    validateFields,
    validEmailExists,
  ],
  createUsers
);

router.patch('/:id', validUserExists, updateUsers);

router.delete('/:id', validUserExists, deleteUsers);

module.exports = {
  usersRouter: router,
};
