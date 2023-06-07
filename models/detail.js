'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail.belongsTo(models.User)
    }
  }
  Detail.init({
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'fullname cannot null'
        },
        notEmpty: {
          msg: 'fullname cannot empty'
        }
      }
    },
    card: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Phone cannot null'
        },
        notEmpty: {
          msg: 'Phone cannot empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detail',
  });
  return Detail;
};