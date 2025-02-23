'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn('products', 'slug', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      })
    } catch (error) {
      console.error('Error when updating column "slug" in "products":', error)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn('products', 'slug', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      })
    } catch (error) {
      console.error('Error when reverting column "slug" in "products":', error)
    }
  }
}

// async up(queryInterface, Sequelize) {
//   try {
//     await queryInterface.changeColumn('posts', 'slug', {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: false
//     })
//   } catch (error) {
//     console.log('Error when update  ')
//   }
// },
// async down(queryInterface, Sequelize) {
//   await queryInterface.changeColumn('posts', 'slug', {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   })
// }
