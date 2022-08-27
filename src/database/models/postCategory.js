const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'BlogPosts',
        key: 'id'
      }
    },

    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
  },{
    timestamps: false
  });

  PostCategory.associate = (models) => {
    
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'BlogPosts',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
}


module.exports = PostCategory;