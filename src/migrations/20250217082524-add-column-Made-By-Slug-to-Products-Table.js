'use strict'
const db = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await db.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'Products',
        'madeBy',
        {
          type: Sequelize.ENUM('KATEC', 'OTHER'),
          allowNull: false
        },
        { transaction }
      )
      await queryInterface.addColumn(
        'Products',
        'slug',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false
        },
        { transaction }
      )
      await queryInterface.addColumn(
        'Products',
        'urlImage',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      )
      await queryInterface.addColumn(
        'Products',
        'priority',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.log('Error when add column')
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'madeBy')
    await queryInterface.removeColumn('Products', 'slug')
    await queryInterface.removeColumn('Products', 'urlImage')
    await queryInterface.removeColumn('Products', 'priority')
  }
}
