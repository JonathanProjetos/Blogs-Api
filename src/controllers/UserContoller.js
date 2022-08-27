const UserService = require('../services/UserServices');
const jwtToken = require('../middleware/token');

const UserController = {
  addUser: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const token = jwtToken.generateToken(email);
    await UserService.addUser({ displayName, email, password, image });
    return res.status(201).json({ token });
  },

  allUsers: async (_req, res) => {
    const result = await UserService.allUsers();
    return res.status(200).json(result);
  },

  getUser: async (req, res) => {
    const { id } = req.params;
    const result = await UserService.getUser(id);
    return res.status(200).json(result);
  },

};

module.exports = UserController;