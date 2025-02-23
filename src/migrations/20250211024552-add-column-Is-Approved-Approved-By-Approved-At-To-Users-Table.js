'use strict'
const db = require('../models')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await db.sequelize.transaction()
    try {
      await queryInterface.addColumn(
        'Users',
        'isApproved',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        { transaction }
      )

      await queryInterface.addColumn(
        'Users',
        'approvedBy',
        {
          type: Sequelize.BIGINT,
          allowNull: true
        },
        { transaction }
      )

      await queryInterface.addColumn(
        'Users',
        'approvedAt',
        {
          type: Sequelize.DATE,
          allowNull: true
        },
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.log('Error when add column to Users table: ', error.message)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'isApproved')
    await queryInterface.removeColumn('Users', 'approvedBy')
    await queryInterface.removeColumn('Users', 'approvedAt')
  }
}
