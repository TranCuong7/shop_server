'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn('Images', 'imageableId', {
        type: Sequelize.BIGINT,
        allowNull: true
      })
    } catch (error) {
      console.log('Error when update null imageableId')
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Images', 'imageableId', {
      type: Sequelize.BIGINT,
      allowNull: false
    })
  }
}
