const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findUserById,
  deleteUsers,
  updateUsers,
} = require('../controllers/users.controllers');
const {
  validUserExists,
  updatePassword,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('', findAllUsers);

router.get('/:id', validUserExists, findUserById);

router.patch('/:id', [
  check('name', 'Name is require').not().isEmpty(),
  check('email', 'Email is require').not().isEmpty(),
  validateFields,
  validUserExists,
  updateUsers,
]);

router.patch(
  '/password/:id',
  [
    check('currentPassword', 'Current password is require').not().isEmpty(),
    check('newPassword', 'New password is require').not().isEmpty(),
    validateFields,
    validUserExists,
  ],
  updatePassword
);

router.delete('/:id', validUserExists, deleteUsers);

module.exports = {
  usersRouter: router,
};
