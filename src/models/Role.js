'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.Permission, {
        through: {
          model: models.RoleHasPermission
        },
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions'
      })

      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users'
      })
    }
  }

  Role.init(
    {
      roleName: DataTypes.STRING,
      roleSlug: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      createdBy: DataTypes.BIGINT,
      updatedBy: DataTypes.BIGINT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'Roles',
      modelName: 'Role',
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeUpdate(Role) {
          Role.updatedAt = new Date()
        }
      }
    }
  )
  return Role
}
