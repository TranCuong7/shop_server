'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Posts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        userId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        status: {
          type: Sequelize.ENUM('draft', 'published'),
          defaultValue: 'draft'
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false
        },
        seoTitle: {
          type: Sequelize.STRING,
          allowNull: true
        },
        seoDescription: {
          type: Sequelize.STRING,
          allowNull: true
        },
        cateGory: {
          type: Sequelize.STRING,
          allowNull: true
        },
        seoKeywords: {
          type: Sequelize.STRING,
          allowNull: true
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
        timestamps: true,
        paranoid: true
      }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts')
  }
}
