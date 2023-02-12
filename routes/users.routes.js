const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findUserById,
  deleteUsers,
  updateUsers,
} = require('../controllers/users.controllers');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const {
  validUserExists,
  updatePassword,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('', findAllUsers);

router.get('/:id', validUserExists, findUserById);

router.use(protect);

router.patch(
  '/:id',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Email is require').not().isEmpty(),
    check('email', 'Email has to be a correct format').isEmail(),
    validateFields,
    validUserExists,
    protectAccountOwner,
  ],
  updateUsers
);

router.patch(
  '/password/:id',
  [
    check('currentPassword', 'Current password is require').not().isEmpty(),
    check('newPassword', 'New password is require').not().isEmpty(),
    validateFields,
    validUserExists,
    protectAccountOwner,
  ],
  updatePassword
);

router.delete('/:id', validUserExists, protectAccountOwner, deleteUsers);

module.exports = {
  usersRouter: router,
};
