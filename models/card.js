'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Card.belongsTo(models.User)
    }
  }
  Card.init({
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Card Number cannot null'
        },
        notEmpty: {
          msg: 'Card Number cannot empty'
        }
      }
    },
    holder: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Card Holder cannot null'
        },
        notEmpty: {
          msg: 'Card Holder cannot empty'
        }
      }
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Month cannot null'
        },
        notEmpty: {
          msg: 'Month cannot empty'
        }
      }
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Year cannot null'
        },
        notEmpty: {
          msg: 'Year cannot empty'
        }
      }
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'CVV cannot null'
        },
        notEmpty: {
          msg: 'CVV cannot empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};