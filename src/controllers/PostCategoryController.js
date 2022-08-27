const PostCategoryServices = require('../services/PostCategoryServices');
const validateJoi = require('../middleware/joiValidate');

const PostCategoryController = {

  addPostCategory: async (req, res) => {
    const { body } = req;
    const { email } = req.email;
    const checkValuesJoi = validateJoi.ValidatePostCategory(body);
    const { title, content, categoryIds } = checkValuesJoi;
    const result = await PostCategoryServices
      .addPostCategory({ title, content, categoryIds, email });
    return res.status(201).json(result);
  },

  allPostCategory: async (_req, res) => {
    const result = await PostCategoryServices.allPostCategory();
    return res.status(200).json(result);
  },
};

module.exports = PostCategoryController;