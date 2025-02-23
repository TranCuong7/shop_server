'use strict'
const db = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await db.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'Permissions',
        'type',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'System'
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
    await queryInterface.removeColumn('Permissions', 'type')
  }
}
