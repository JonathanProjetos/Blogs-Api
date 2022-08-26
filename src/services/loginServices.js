const { User } = require('../database/models');

const UserServices = {
  Login: async ({ email }) => {
    const result = await User.findOne({ where: { email } });
    if (!result) throw new Error('400|Invalid fields');
    return result;
  },
};

module.exports = UserServices;