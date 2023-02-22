const catchAsync = require('../helpers/catchAsync');
const Repair = require('../models/repairs.model');
const User = require('../models/user.model');

exports.validRepairExists = catchAsync(async (req, res, next) => {
  const { id, status } = req.params;

  const repair = await Repair.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    where: {
      id,
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: ['name', 'email'],
      },
    ],
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
