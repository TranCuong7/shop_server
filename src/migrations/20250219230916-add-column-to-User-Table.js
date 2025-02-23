'use strict'
const db = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await db.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'Users',
        'companyName',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        { transaction }
      )

      await queryInterface.addColumn(
        'Users',
        'position',
        {
          type: Sequelize.STRING,
          allowNull: true
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
    await queryInterface.removeColumn('Users', 'companyName')
    await queryInterface.removeColumn('Users', 'position')
  }
}
