const Joi = require('joi');

const MESSAGE = 'Some required fields are missing';

const validateLogin = (dados) => {
  const user = Joi.object({
    email: Joi.string().required().messages({
      'any.required': `400|${MESSAGE}`,
      'string.empty': `400|${MESSAGE}`,
    }),

    password: Joi.string().required().messages({
      'any.required': '400|Some required fields are missing',
      'string.empty': '400|Some required fields are missing',
    }),
  });
  
  const { error, value } = user.validate(dados);
  
  if (error) {
    throw error;
  }
  return value;
};

const ValidateUser = (body) => {
  const User = Joi.object({
    displayName: Joi.string().required().min(8).messages({
      'any.required': `400|${MESSAGE}`,
      'string.min': '400|"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'any.required': `400|${MESSAGE}`,
      'string.email': '400|"email" must be a valid email',
    }),
    password: Joi.string().required().min(6).messages({
      'string.min': '400|"password" length must be at least 6 characters long',
      'string.empty': '400|Some required fields are missing',
    }),
    image: Joi.string().required().messages({ 'any.required': `400|${MESSAGE}` }),
  }); 
  
  const { error, value } = User.validate(body);
  if (error) throw error;

  return value;
};

const validateCategory = (catName) => {
  const Category = Joi.object({
    name: Joi.string().required().messages({
      'any.required': '400|"name" is required',
      'string.empty': `400|${MESSAGE}`,
    }),
  });

  const { error, value } = Category.validate(catName);
  
  if (error) {
    throw error;
  }
  return value;
};

module.exports = {
  validateLogin,
  ValidateUser,
  validateCategory,
};