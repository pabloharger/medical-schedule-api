'use strict'

module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
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
    Schedule.belongsTo(models.doctor, { foreignKey: 'doctorId', as: 'doctor' })
    Schedule.belongsTo(models.patient, { foreignKey: 'patientId', as: 'patient' })
  }

  return Schedule
}
