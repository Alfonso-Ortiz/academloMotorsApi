const catchAsync = require('../helpers/catchAsync');
const Repair = require('../models/repairs.model');

exports.validRepairExists = catchAsync(async (req, res, next) => {
  const { id, status } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return next(new AppError('The repair has not been found', 404));
  }

  if (status === 'completed') {
    return res.status(404).json({
      status: 'error',
      message: 'The repair has been completed',
    });
  }

  req.repair = repair;
  next();
});
