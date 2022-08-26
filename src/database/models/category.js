const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id:{
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true, 
    },

    name:{
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
    timestamps: false
  });

  return Category;
}

module.exports = Category;