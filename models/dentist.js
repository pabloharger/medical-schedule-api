'use strict'

module.exports = (sequelize, DataTypes) => {
  const Dentist = sequelize.define('dentist', {
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
          msg: 'Last name is required'
        }
      }
    },
    docNumber: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {})

  return Dentist
}
