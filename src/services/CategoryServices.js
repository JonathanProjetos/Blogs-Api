const { Category } = require('../database/models');
const joiValidate = require('../middleware/joiValidate');

const CategoryServices = {
  
  addCategory: async ({ name }) => {
    const check = joiValidate.validateCategory({ name });
    const result = await Category.create(check);
    return result;
  },

  getCategory: async () => {
    const result = await Category.findAll();
    return result;
  },
};

module.exports = CategoryServices;