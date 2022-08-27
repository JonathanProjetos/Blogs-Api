const { BlogPost, PostCategory, User, sequelize } = require('../database/models');
const validateId = require('../middleware/checkPostCategory');

const PostCategoryServices = {

  addPostCategory: async ({ title, content, categoryIds, email }) => {
    const transactionPost = await sequelize.transaction(async (transaction) => {
      await validateId(categoryIds);
      
      const checkId = await User.findOne({
        where: { email },
      });

      const result = await BlogPost.create(
        { title, content, userId: checkId.dataValues.id },
        { transaction },
      );

      const postCategories = categoryIds
        .map((cat) => ({ categoryId: cat, postId: result.id }));

      await PostCategory.bulkCreate(postCategories, { transaction });

      return result.dataValues;
    });
    return transactionPost;
  },

};

module.exports = PostCategoryServices;