const jwt = require('jsonwebtoken');
const UserService = require('../services/UserServices');

const { JWT_SECRET } = process.env;

const UserController = {
  addUser: async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    await UserService.addUser({ displayName, email, password, image });
    return res.status(201).json({ token });
  },
};

module.exports = UserController;