'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const { dateFormatter } = require('../helper/formatdate');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserMovies, { foreignKey: 'UserId' })
      User.hasOne(models.Detail)
      User.hasOne(models.Card)
      User.belongsTo(models.Member)
    }

    get licenseDate() {
      return dateFormatter(this.createdAt)
    }

    static allUser() {
      return User.findAll({
        include: [
          {
            model: sequelize.models.Detail
          },
          {
            model: sequelize.models.Card
          },
          {
            model: sequelize.models.Member
          }
        ],
        where: { role: 'user' }
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Username cannot null'
        },
        notEmpty: {
          msg: 'Username cannot empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email cannot empty'
        },
        notEmpty: {
          msg: 'Email cannot empty'
        },
        isEmail: {
          msg: 'Email format is wrong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'fullname cannot empty'
        },
        notEmpty: {
          msg: 'fullname cannot empty'
        },
        len: {
          args: 8,
          msg: 'Minimum Password Characters is 8'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    },
    MemberId: {
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
        user.role = 'user'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};