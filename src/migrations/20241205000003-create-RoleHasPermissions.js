'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'RoleHasPermissions',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        roleId: {
          type: Sequelize.BIGINT
        },
        permissionId: {
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
        timestamps: true
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RoleHasPermissions')
  }
}
