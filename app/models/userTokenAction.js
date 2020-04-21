'use strict'

module.exports = (sequelize, DataTypes) => {
  const UserTokenAction = sequelize.define('userTokenAction', {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    action: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {})

  UserTokenAction.associate = (models) => {
    UserTokenAction.belongsTo(models.user, {
      as: 'user',
      foreignKey: {
        fieldName: 'idUser',
        allowNull: false
      }
    })
  }

  return UserTokenAction
}
