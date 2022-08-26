const Joi = require('joi');

const validateLogin = (dados) => {
  const user = Joi.object({
    email: Joi.string().required().messages({
      'any.required': '400|Some required fields are missing',
      'string.empty': '400|Some required fields are missing',
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

/* const ValidateSales = (salesData) => {
  const body = Joi.array()
    .items({
      productId: Joi.number().integer().required().messages({
        'any.required': '400|"productId" is required',
      }),
      quantity: Joi.number().integer().greater(0).required()
        .messages({
          'any.required': '400|"quantity" is required',
          'number.greater': '422|"quantity" must be greater than or equal to 1',
        }),
    });
  
  const { error, value } = body.validate(salesData);
  if (error) throw error;
  return value;
}; */

module.exports = {
  validateLogin,
 // ValidateSales,
};