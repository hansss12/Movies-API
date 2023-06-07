'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserMovies.belongsTo(models.User, { foreignKey: 'UserId' })
      UserMovies.belongsTo(models.Movie, { foreignKey: 'MovieId' })
    }
  }
  UserMovies.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    MovieId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'UserMovies',
  });
  return UserMovies;
};