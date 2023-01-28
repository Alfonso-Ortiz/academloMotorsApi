const Repair = require('../models/repairs.model');

exports.validRepairExists = async (req, res, next) => {
  try {
    const { id, status } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: 'Error',
        message: 'The repair has not been found',
      });
    }

    if (status === 'completed') {
      return res.status(404).json({
        status: 'error',
        message: 'The repair has been completed',
      });
    }

    req.repair = repair;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
