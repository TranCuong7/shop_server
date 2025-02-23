'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class AccessLog extends Model {
    static associate(models) {}
  }

  AccessLog.init(
    {
      accessType: DataTypes.STRING,
      modalId: DataTypes.BIGINT,
      ipAddress: DataTypes.STRING,
      accessToken: DataTypes.STRING,
      userAgent: DataTypes.STRING,
      accessLocation: DataTypes.STRING,
      logoutAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
      createdBy: DataTypes.BIGINT,
      updatedBy: DataTypes.BIGINT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'AccessLogs',
      modelName: 'AccessLog',
      paranoid: true,
      timestamps: true
    }
  )
  return AccessLog
}
