const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtCheck = {

  generateToken: (displayName, email, password, image) => {
    const token = jwt.sign({ displayName, email, password, image }, JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  },

  validateToken: (token) => {
    if (!token) throw new Error('401|Token not found');
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.log(error);
      throw new Error('401|Expired or invalid token');
    }
  },
};

module.exports = jwtCheck;