const jwtToken = require('./token');

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;
  jwtToken.validateToken(authorization);
  next();
};