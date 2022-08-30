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

  getPostCategory: async (req, res) => {
    const { id } = req.params;
    const result = await PostCategoryServices.getPostCategory(id);
    return res.status(200).json(result);
  },

  putPostCategory: async (req, res) => {
    const { id } = req.params;
    const { email } = req.email;
    const { title, content } = req.body;
    const checkValuesJoi = validateJoi.ValidatePostCategory({ title, content });
    // checkValuesJoi: valido os campos que vem do body
    await PostCategoryServices.putPostCategory({ id, checkValuesJoi, email });
    // PostCategoryServices.putPostCategory: método que estou usando para atualizar os dados no banco
    const result = await PostCategoryServices.getPostCategory(id);
    // PostCategoryServices.getPostCategory trago os dados atualizados como resposta.
    return res.status(200).json(result);
  },

  deletePostCategory: async (req, res) => {
    const { id } = req.params;
    const { email } = req.email;
    await PostCategoryServices.deletePostCategory(id, email);
    return res.status(204).end();
  },

  queryPostCategory: async (req, res) => {
    const { q } = req.query;
    const result = await PostCategoryServices.queryPostCategory(q);
    return res.status(200).json(result);
  },
};

module.exports = PostCategoryController;