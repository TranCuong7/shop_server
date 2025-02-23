'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const hidden = ['password']

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      })

      // User.hasOne(models.GeneralInfo, {
      //   foreignKey: 'userId',
      //   as: 'generalInfo'
      // })
    }

    static async comparePassword(password, parent) {
      return await bcrypt.compare(password, parent.password)
    }

    toJSON() {
      const attributes = Object.assign({}, this.get())
      for (const attribute of hidden) {
        delete attributes[attribute]
      }
      return attributes
    }
  }

  User.init(
    {
      roleId: DataTypes.BIGINT,
      userCode: DataTypes.STRING,
      userFullName: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      userPhone: DataTypes.STRING,
      companyName: DataTypes.STRING,
      position: DataTypes.STRING,
      userAddress: DataTypes.STRING,
      userAvatar: DataTypes.STRING,
      account: DataTypes.STRING,
      password: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      createdBy: DataTypes.BIGINT,
      updatedBy: DataTypes.BIGINT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      isApproved: DataTypes.BOOLEAN,
      approvedBy: DataTypes.BIGINT,
      approvedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'User',
      paranoid: true,
      timestamps: true,
      hooks: {
        beforeCreate: async (parent) => {
          if (parent.password) {
            parent.password = await bcrypt.hash(parent.password, SALT_ROUNDS)
          }
        },
        beforeBulkCreate: async (parents, options) => {
          await Promise.all(
            parents.map(async (parent) => {
              parent.password = await bcrypt.hash(parent.password, SALT_ROUNDS)
            })
          )
        },
        beforeUpdate: async (parent) => {
          if (parent.changed('password')) {
            parent.password = await bcrypt.hash(parent.password, SALT_ROUNDS)
          }
        }
      }
    }
  )
  return User
}
