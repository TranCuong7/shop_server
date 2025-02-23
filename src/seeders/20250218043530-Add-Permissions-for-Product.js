'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Permissions',
      [
        {
          id: 35,
          parentId: null,
          permissionName: 'Sản phẩm',
          permissionSlug: 'PRODUCT'
        },
        {
          id: 36,
          parentId: 35,
          permissionName: 'Thêm',
          permissionSlug: 'PRODUCT_CREATE'
        },
        {
          id: 37,
          parentId: 35,
          permissionName: 'Cập nhật',
          permissionSlug: 'PRODUCT_UPDATE'
        },
        {
          id: 38,
          parentId: 35,
          permissionName: 'Xoá',
          permissionSlug: 'PRODUCT_DELETE'
        },
        {
          id: 39,
          parentId: null,
          permissionName: 'Media',
          permissionSlug: 'MEDIA'
        },
        {
          id: 40,
          parentId: 39,
          permissionName: 'Thêm',
          permissionSlug: 'MEDIA_UPLOAD'
        },
        {
          id: 41,
          parentId: 39,
          permissionName: 'Cập nhật',
          permissionSlug: 'MEDIA_UPDATE'
        },
        {
          id: 42,
          parentId: 39,
          permissionName: 'Xóa',
          permissionSlug: 'MEDIA_DELETE'
        },
        {
          id: 43,
          parentId: null,
          permissionName: 'PERMISSIONS',
          permissionSlug: 'PERMISSIONS'
        },
        {
          id: 44,
          parentId: 43,
          permissionName: 'Thêm',
          permissionSlug: 'PERMISSIONS_CREATE'
        },
        {
          id: 45,
          parentId: 43,
          permissionName: 'Cập nhật',
          permissionSlug: 'PERMISSIONS_UPDATE'
        },
        {
          id: 46,
          parentId: 43,
          permissionName: 'Xóa',
          permissionSlug: 'PERMISSIONS_DELETE'
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Permissions',
      {
        id: { [Sequelize.Op.in]: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46] }
      },
      {}
    )
  }
}
