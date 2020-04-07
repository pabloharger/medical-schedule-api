'use strict'

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
    dateTieEnd: {
      type: DataTypes.DATE,
      allowNull: false
    },
    observation: {
      type: DataTypes.STRING
    }
  }, {})

  // association: a course can belong to any user (belongsTo)
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
        fieldName: 'idDentist',
        allowNull: false
      }
    })
  }
  return Schedule
}
