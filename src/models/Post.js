const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })

      Post.hasMany(models.Image, {
        foreignKey: 'imageableId',
        as: 'images',
        constraints: false,
        scope: {
          imageableType: 'Post'
        }
      })
    }
  }

  Post.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.BIGINT,
      status: DataTypes.ENUM('draft', 'published'),
      slug: DataTypes.STRING,
      seoTitle: DataTypes.STRING,
      cateGory: DataTypes.STRING,
      seoDescription: DataTypes.STRING,
      seoKeywords: DataTypes.STRING,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'Posts',
      modelName: 'Post',
      paranoid: true
    }
  )

  return Post
}
