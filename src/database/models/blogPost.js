const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
  
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    content:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  
    userId:{
      type: DataTypes.INTEGER,
      foreignKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  
    published:{
      type: DataTypes.DATE,
    },
  
    updated:{
      type: DataTypes.DATE,
    }
  },{
    createdAt: 'published',
    updatedAt: 'updated',
    tableName: 'BlogPosts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
  };
  return BlogPost;
}

module.exports = BlogPost;