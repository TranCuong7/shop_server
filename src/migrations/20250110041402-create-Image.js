'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imageableType: {
        type: Sequelize.STRING, // Lưu tên mô hình liên kết (ví dụ: "Post", "User")
        allowNull: false
      },
      imageableId: {
        type: Sequelize.BIGINT, // Lưu ID của mô hình liên kết
        allowNull: true
      },
      imageType: {
        type: Sequelize.STRING,
        allowNull: true, // Bắt buộc phải có loại hình ảnh
        defaultValue: 'thumbnail' // Giá trị mặc định là thumbnail
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Images')
  }
}
