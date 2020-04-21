'use strict'

const User = require('./user')

module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
    idDentist: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idPatient: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateTimeBegin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateTimeEnd: {
      type: DataTypes.DATE,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING
    }
  }, {})

  Schedule.associate = models => {
    Schedule.belongsTo(models.dentist, {
      as: 'dentist',
      foreignKey: {
        fieldName: 'idDentist',
        allowNull: false
      }
    })

    Schedule.belongsTo(models.patient, {
      as: 'patient',
      foreignKey: {
        fieldName: 'idPatient',
        allowNull: false
      }
    })
  }

  return Schedule
}
