const CategoryServices = require('../services/CategoryServices');

const CategoryControllers = {

  addCategory: async (req, res) => {
    const { name } = req.body;
    const result = await CategoryServices.addCategory({ name });
    return res.status(201).json(result.dataValues);
  },

  getCategory: async (_req, res) => {
    const result = await CategoryServices.getCategory();
    return res.status(200).json(result);
  },
};

module.exports = CategoryControllers;