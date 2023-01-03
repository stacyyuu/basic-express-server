const { sequelize } = require('../../src/models');
const { createUser } = require('./user');

const User = createUser(sequelize);

module.exports = {
  User,
  sequelize,
};
