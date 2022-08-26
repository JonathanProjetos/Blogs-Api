const CategoryServices = require('../services/CategoryServices');

const CategoryControllers = {

  addCategory: async (req, res) => {
    const { name } = req.body;
    console.log(name);
    const result = await CategoryServices.addCategory({ name });
    return res.status(201).json({ id: result.insertId, name });
  },
};

module.exports = CategoryControllers;