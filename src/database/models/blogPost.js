

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
      allowNull: false,
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
  
    published:{
      type: DataTypes.DATE,
      allowNull: false,
    },
  
    updated:{
      type: DataTypes.DATE,
      allowNull: false,
    }
    
    
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