const jwt = require('jsonwebtoken');
const UserServices = require('../services/loginServices');
const { validateLogin } = require('../middleware/joiValidate');

const { JWT_SECRET } = process.env;

const Login = {
  Login: async (req, res) => {
    const { email, password } = req.body;
    const check = validateLogin({ email, password });

    const token = jwt.sign({ check }, JWT_SECRET, {
      expiresIn: '1d',
    });

    const result = await UserServices.Login({ email });

    if (!result) return res.status(400).json({ message: 'Invalid fields' });
    return res.status(200).json({ token });
  },
};

module.exports = Login;