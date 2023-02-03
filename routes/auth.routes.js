const { Router } = require('express');
const { check } = require('express-validator');
const { createUsers, login } = require('../controllers/auth.controller');
const {
  validEmailExists,
  validEmailExistsLogin,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/signup',
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

router.post(
  '/login',
  [
    check('email', 'Email is require').not().isEmpty(),
    check('email', 'Email has to be a correct format').isEmail(),
    check('password', 'Password is require').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = {
  authRouter: router,
};
