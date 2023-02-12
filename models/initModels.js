const Repair = require('./repairs.model');
const User = require('./user.model');

const initModel = () => {
  // 1 usuario <------------> N repairs
  User.hasMany(Repair, { sourceKey: 'id', foreignKey: 'userId' });
  Repair.belongsTo(User, { sourceKey: 'id', foreignKey: 'userId' });
};

module.exports = initModel;
