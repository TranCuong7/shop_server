const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      })

      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      })
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      status: {
        type: DataTypes.ENUM('available', 'out_of_stock', 'discontinued'),
        defaultValue: 'available'
      },
      companyId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      companyURL: {
        type: DataTypes.STRING,
        allowNull: true
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },

      urlImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      madeBy: {
        type: DataTypes.ENUM('KATEC', 'OTHER'),
        allowNull: false
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      categoryId: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: 'Products',
      modelName: 'Product',
      timestamps: true,
      paranoid: true
    }
  )

  return Product
}
