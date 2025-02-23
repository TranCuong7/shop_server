'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM('available', 'out_of_stock', 'discontinued'),
        defaultValue: 'available'
      },

      companyId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      companyURL: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      categoryId: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products')
  }
}
