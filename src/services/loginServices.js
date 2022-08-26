const { User } = require('../database/models');
// const joiValidate = require('../middleware/joiValidate');

const UserServices = {
  Login: async ({ email }) => {
   // const check = joiValidate(email);
    const result = await User.findOne({ where: { email } });
    if (!result) throw new Error('400|Invalid fields');
    return result;
  },
};

module.exports = UserServices;