'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    const roles = [
      {
        id: 1,
        roleName: 'Admin',
        roleSlug: 'admin',
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]

    await queryInterface.bulkInsert('Roles', roles)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
