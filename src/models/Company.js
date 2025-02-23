'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Product, {
        foreignKey: 'companyId',
        as: 'products'
      })
    }
  }
  Company.init(
    {
      userFullName: DataTypes.STRING,
      yearOfBirth: DataTypes.INTEGER,
      userEmail: DataTypes.STRING,
      userAvatar: DataTypes.STRING,
      hometown: DataTypes.STRING,
      userPhone: DataTypes.STRING,
      companyName: DataTypes.STRING,
      position: DataTypes.STRING,
      businessField: DataTypes.STRING,
      businessAddress: DataTypes.STRING,
      websiteOrHotline: DataTypes.STRING,
      note: DataTypes.STRING,
      approvalStatus: DataTypes.ENUM('Đang chờ', 'Đã duyệt', 'Từ chối'),
      approvedBy: DataTypes.BIGINT,
      approvedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Company',
      tableName: 'Companies'
    }
  )
  return Company
}
