'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      userFullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      yearOfBirth: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userAvatar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      hometown: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      businessField: {
        type: Sequelize.STRING,
        allowNull: false
      },
      businessAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      websiteOrHotline: {
        type: Sequelize.STRING,
        allowNull: true
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true
      },
      approvalStatus: {
        type: Sequelize.ENUM('Đang chờ', 'Đã duyệt', 'Từ chối'),
        defaultValue: 'Đang chờ'
      },
      approvedBy: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      approvedAt: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.dropTable('Companies')
  }
}
