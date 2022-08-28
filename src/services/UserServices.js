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

  getUser: async (id) => {
    const result = await User.findOne(
      {
        where: { id },
        attributes: { exclude: ['password'] },
      },
    );
    if (!result) throw new Error('404|User does not exist');
    return result;
  },

  deleteUser: async (email) => {
    const checkId = await User.findOne({
      where: { email },
    });
    
    if (!checkId) throw new Error('404|User does not exist');

    const userId = checkId.dataValues.id;

    await User.destroy({
      where: { id: userId },
    });
  },

};

module.exports = UserServices;