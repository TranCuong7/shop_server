const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products'
      })
    }
  }

  Category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      type: DataTypes.STRING,
      permissionId: DataTypes.BIGINT
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories',
      paranoid: true,
      timestamps: true
    }
  )

  return Category
}
