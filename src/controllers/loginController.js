const UserServices = require('../services/loginServices');
const { validateLogin } = require('../middleware/joiValidate');
const jwtLogin = require('../middleware/tokenLogin');

const Login = {
  Login: async (req, res) => {
    const { email, password } = req.body;
    const check = validateLogin({ email, password });
    const token = jwtLogin.generateTokenLogin(email);
    const result = await UserServices.Login(check);

    if (!result) return res.status(400).json({ message: 'Invalid fields' });
    return res.status(200).json({ token });
  },
};

module.exports = Login;