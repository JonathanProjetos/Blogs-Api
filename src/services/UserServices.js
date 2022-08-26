const { User } = require('../database/models');

const UserServices = {
  Login: async ({ email, password }) => {
    const result = await User.create({ email, password });
    return result;
  },
};

module.exports = UserServices;