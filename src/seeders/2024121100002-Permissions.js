'use strict'
const { PERMISSIONS } = require('../constants/index')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Permissions', PERMISSIONS)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
