'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blogs.init({
    project_name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    technologies: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'blogs',
    timestamps: true,
    createdAt: true,
    updatedAt: 'timestamps',
  });
  return blogs;
};