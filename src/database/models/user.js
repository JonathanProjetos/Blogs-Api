const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true, 
    },

    displayName:{
      type: DataTypes.STRING,
      allowNull: false
    },

    email:{
      type: DataTypes.STRING,
      allowNull: false
    },

    password:{
      type: DataTypes.STRING,
      allowNull: false
    },

    image:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: "userId",
      as: "blogPost"
    });
  };

  return User;
}

module.exports = User;