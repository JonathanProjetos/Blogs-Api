const jwtCheckUser = require('./token');
const jwtCheckLogin = require('./tokenLogin');

module.exports = {
  userToken: (req, _res, next) => {
    const { authorization } = req.headers;
    const dados = jwtCheckUser.validateToken(authorization);
    console.log('test', dados);
    req.user = dados;
    next();
  },

  loginToken: (req, _res, next) => {
    const { authorization } = req.headers;
    const dados = jwtCheckLogin.validateTokenLogin(authorization);
    req.email = dados;
    next();
  },
};