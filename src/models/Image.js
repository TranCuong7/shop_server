const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // Quan hệ Polymorphic
      Image.belongsTo(models.Post, {
        foreignKey: 'imageableId',
        as: 'post',
        constraints: false,
        scope: {
          imageableType: 'Post'
        }
      })

      Image.belongsTo(models.User, {
        foreignKey: 'imageableId',
        as: 'user',
        constraints: false,
        scope: {
          imageableType: 'User'
        }
      })

      Image.belongsTo(models.Company, {
        foreignKey: 'imageableId',
        as: 'company',
        constraints: false,
        scope: {
          imageableType: 'Company'
        }
      })
    }
  }

  Image.init(
    {
      url: DataTypes.STRING,
      imageableId: DataTypes.BIGINT, // ID của đối tượng liên kết (Post, User, v.v.)
      imageableType: DataTypes.STRING,
      imageType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'thumbnail'
      }
    },
    {
      sequelize,
      tableName: 'Images',
      modelName: 'Image',
      timestamps: true,
      hooks: {
        beforeUpdate(image) {
          image.updatedAt = new Date()
        }
      }
    }
  )

  return Image
}
