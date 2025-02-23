'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date()

    const data = [
      {
        id: 1,
        roleId: 1,
        userFullName: 'Quản lý',
        userEmail: 'example@gmail.com',
        account: 'admin',
        password: bcrypt.hashSync('123456', 10),
        createdAt: timestamp,
        updatedAt: timestamp
      }
    ]

    await queryInterface.bulkInsert('Users', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
