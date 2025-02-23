'use strict'
const { PERMISSIONS } = require('../constants/index')

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    const data = PERMISSIONS.map((permission, index) => ({
      id: index + 1,
      roleId: 1,
      permissionId: permission.id,
      createdAt: timestamp,
      updatedAt: timestamp
    }))

    await queryInterface.bulkInsert('RoleHasPermissions', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RoleHasPermissions', null, {})
  }
}
