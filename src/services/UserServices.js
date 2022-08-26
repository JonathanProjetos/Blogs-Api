const { User } = require('../database/models');
const joiValidate = require('../middleware/joiValidate');

const UserServices = {
  addUser: async ({ displayName, email, password, image }) => {
    const check = joiValidate.ValidateUser({ displayName, email, password, image });
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) throw new Error('409|User already registered');
    const result = await User.create(check);
    return result;
  },

  allUsers: async () => {
    const result = await User.findAll(
      { attributes: { exclude: ['password'] } },
    );
    return result;
  },

};

module.exports = UserServices;