'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'AccessLogs',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        accessType: {
          allowNull: false,
          type: Sequelize.STRING(20)
        },
        modalId: {
          type: Sequelize.BIGINT
        },
        ipAddress: {
          type: Sequelize.STRING
        },
        accessToken: {
          type: Sequelize.STRING
        },
        userAgent: {
          type: Sequelize.STRING
        },
        accessLocation: {
          type: Sequelize.STRING
        },
        logoutAt: {
          type: Sequelize.DATE
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
    await queryInterface.dropTable('AccessLogs')
  }
}
