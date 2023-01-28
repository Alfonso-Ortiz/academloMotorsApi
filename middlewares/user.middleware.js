const User = require('../models/user.model');

exports.validUserExists = async (req, res, next) => {
  try {
    // !1. RECIBIMOS EL ID PASADO POR PARAMETROS
    const { id } = req.params;

    // !2. BUSCAMOS EL USUARIO CON DICHO ID Y QUE SU STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        id,
        status: 'enabled',
      },
    });

    // !3. SI EL ID ES NULL O NO EXISTE ENVIAMOS ESTE ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.validEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user && user.status === 'disable') {
      // todo: lo que deberiamos hacer es hacer un update de la cuenta a true
      // await user.update({ status: 'enabled' });
      return res.status(400).json({
        status: 'Error',
        message:
          'The user has a registered account but it is desactivated, contact customer service to activate it',
      });
    }

    if (user) {
      return res.status(400).json({
        status: 'Error',
        message: 'The user already exists',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
