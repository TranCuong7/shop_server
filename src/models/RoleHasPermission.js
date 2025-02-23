'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RoleHasPermission extends Model {
    static associate(models) {
      RoleHasPermission.belongsTo(models.Permission, {
        foreignKey: { name: 'permissionId', allowNull: false },
        as: 'permission'
      })
      RoleHasPermission.belongsTo(models.Role, {
        foreignKey: { name: 'roleId', allowNull: false },
        as: 'role'
      })
    }
  }

  RoleHasPermission.init(
    {
      roleId: DataTypes.BIGINT,
      permissionId: DataTypes.BIGINT
    },
    {
      sequelize,
      tableName: 'RoleHasPermissions',
      modelName: 'RoleHasPermission',
      timestamps: true
    }
  )
  return RoleHasPermission
}
