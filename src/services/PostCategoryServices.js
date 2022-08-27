const { BlogPost, PostCategory, Category, User, sequelize } = require('../database/models');
const validateId = require('../middleware/checkPostCategory');

const PostCategoryServices = {

  addPostCategory: async ({ title, content, categoryIds, email }) => {
    const transactionPost = await sequelize.transaction(async (transaction) => {
      await validateId(categoryIds);

      const checkId = await User.findOne({
        where: { email },
      });
     /*  checkId.password = '123456';
      await checkId.update(); */
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

  allPostCategory: async () => {
    const result = await BlogPost.findAll(
      {
        include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
          through: {
            attributes: [],
          },
        },
      ],
     },
    
    );

return result;
  },

};

module.exports = PostCategoryServices;