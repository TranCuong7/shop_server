'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'RoleHasPermissions',
      [
        {
          roleId: 1,
          permissionId: 35
        },
        {
          roleId: 1,
          permissionId: 36
        },
        {
          roleId: 1,
          permissionId: 37
        },
        {
          roleId: 1,
          permissionId: 38
        },
        {
          roleId: 1,
          permissionId: 39
        },
        {
          roleId: 1,
          permissionId: 40
        },
        {
          roleId: 1,
          permissionId: 41
        },
        {
          roleId: 1,
          permissionId: 42
        },
        {
          roleId: 1,
          permissionId: 43
        },
        {
          roleId: 1,
          permissionId: 44
        },
        {
          roleId: 1,
          permissionId: 45
        },
        {
          roleId: 1,
          permissionId: 46
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'RoleHasPermissions',
      {
        permissionId: { [Sequelize.Op.in]: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46] }
      },
      {}
    )
  }
}
