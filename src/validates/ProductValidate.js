// validations/PostValidate.js
const { body } = require('express-validator')
const { message } = require('../constants/message')
const db = require('../models')

const validateProduct = [
  body('slug')
    .notEmpty()
    .withMessage('Slug không được để trống')
    .custom(async (slug) => {
      if (!slug) throw new Error('Slug không hợp lệ')
      const existingSlug = await db.Product.findOne({
        where: { slug }
      })
      if (existingSlug) {
        throw new Error('Slug này đã tồn tại vui lòng thay đổi Slug')
      }
      const existingSlug = await db.Product.findOne({
        where: { slug }
      })
      if (existingSlug) {
        throw new Error('Slug này đã tồn tại vui lòng thay đổi Slug')
      }
      return true
    }),

  body('priority').isInt({ min: 0 }).withMessage(message.invalid),
  body('name').notEmpty().withMessage(message.notEmpty),
  body('description').notEmpty().withMessage(message.notEmpty),
  body('description').notEmpty().withMessage(message.notEmpty),
  body('price').isFloat({ min: 0 }).withMessage(message.invalid),
  body('quantity').isInt({ min: 0 }).withMessage(message.invalid),
  body('status').isIn(['out_of_stock', 'discontinued', 'available']).withMessage(message.invalid),
  body('urlImage').notEmpty().withMessage(message.notEmpty),
  body('companyId').notEmpty().withMessage(message.notEmpty),
  body('companyURL').isURL().withMessage(message.invalid),
  body('categoryId').notEmpty().withMessage(message.notEmpty),
  body('slug').notEmpty().withMessage(message.notEmpty)
]
const validateAddProduct = [
  body('slug')
    .notEmpty()
    .withMessage('Slug không được để trống')
    .custom(async (slug) => {
      const existingSlug = await db.Product.findOne({
        where: { slug },
        paranoid: true
      })

      if (existingSlug) {
        throw new Error('Slug này đã tồn tại vui lòng thay đổi Slug')
      }

      return true
    })
]

module.exports = { validateProduct, validateAddProduct }
