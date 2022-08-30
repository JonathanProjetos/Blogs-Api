const { 
  BlogPost, 
  PostCategory,
  Category, 
  User, 
  sequelize, 
  Sequelize } = require('../database/models');

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

  getPostCategory: async (id) => {
    const result = await BlogPost.findOne({
      where: { id },
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
      }],
    });
    if (!result) throw new Error('404|Post does not exist');
    return result;
  },

  putPostCategory: async ({ id, email, checkValuesJoi }) => {
    const { title, content } = checkValuesJoi;

    const checkIdUser = await User.findOne({
      where: { email },
    });

    const idUser = checkIdUser.dataValues.id;

    const checkPostId = await BlogPost.findOne({
      where: { id },
    });

    if (!checkPostId) throw new Error('404|Post does not exist');

    const idPost = checkPostId.dataValues.userId;

    if (Number(idUser) !== Number(idPost)) throw new Error('401|Unauthorized user');

    await BlogPost.update({
      title, content,
    },
      { where: { id } });
  },

  deletePostCategory: async (id, email) => {
    const checkIdUser = await User.findOne({
      where: { email },
    });

    const idUser = checkIdUser.dataValues.id;

    const checkPostId = await BlogPost.findOne({
      where: { id },
    });

    if (!checkPostId) throw new Error('404|Post does not exist');
    const idPost = checkPostId.dataValues.userId;

    if (Number(idUser) !== Number(idPost)) throw new Error('401|Unauthorized user');

    await BlogPost.destroy({
      where: { id },
    });
  },

  queryPostCategory: async (query) => {
    // console.log(query);
    const { Op } = Sequelize;
    const result = await BlogPost.findAll({
      where: {
        [Op.or]: [{
          title: { [Op.like]: `%${query}%` } }, {
          content: { [Op.like]: `%${query}%` } }],
      }, 
        include: [{
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] } },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] } },
        ] });
    if (!result) throw new Error('404|Post does not exist');
    return result;
  },

};

module.exports = PostCategoryServices;