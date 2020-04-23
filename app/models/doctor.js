'use strict'

module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('doctor', {
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

  Doctor.associate = models => {
    Doctor.hasMany(models.schedule, { as: 'schedules' })
  }

  return Doctor
}
