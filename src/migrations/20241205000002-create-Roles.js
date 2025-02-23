'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Roles',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        roleName: {
          allowNull: false,
          type: Sequelize.STRING(100)
        },
        roleSlug: {
          type: Sequelize.STRING(50),
          unique: true
        },
        deletedAt: {
          type: Sequelize.DATE
        },
        createdBy: {
          type: Sequelize.BIGINT
        },
        updatedBy: {
          type: Sequelize.BIGINT
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles')
  }
}
