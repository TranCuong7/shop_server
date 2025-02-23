'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Users',
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
        userCode: {
          type: Sequelize.STRING(20),
          unique: true
        },
        userAvatar: {
          type: Sequelize.STRING,
          allowNull: true
        },
        userFullName: {
          allowNull: false,
          type: Sequelize.STRING(50)
        },
        userEmail: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true
        },
        userPhone: {
          type: Sequelize.STRING(20)
        },
        userAddress: {
          type: Sequelize.STRING
        },
        account: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
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
    await queryInterface.dropTable('Users')
  }
}
