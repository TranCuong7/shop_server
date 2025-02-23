'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: {
          model: models.RoleHasPermission
        },
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles'
      })
    }
  }

  Permission.init(
    {
      permissionName: DataTypes.STRING,
      permissionSlug: DataTypes.STRING,
      type: DataTypes.STRING,
      parentId: DataTypes.BIGINT
    },
    {
      sequelize,
      tableName: 'Permissions',
      modelName: 'Permission',
      timestamps: false
    }
  )
  return Permission
}
