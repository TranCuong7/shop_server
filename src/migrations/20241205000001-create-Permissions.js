'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Permissions',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        parentId: {
          type: Sequelize.BIGINT
        },
        permissionName: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        permissionSlug: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING(50)
        }
      },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions')
  }
}
