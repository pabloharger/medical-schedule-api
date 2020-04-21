'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Email must be a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        min: {
          args: [4],
          msg: 'Minimum 4 characters required in password'
        }
      }
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {})

  return User
}
