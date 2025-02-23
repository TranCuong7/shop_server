// validations/PostValidate.js
const { body } = require('express-validator')
const { message } = require('../constants/message')
const db = require('../models')

const validatePost = [
  body('title').notEmpty().withMessage(message.notEmpty).isLength({ max: 255 }),

  body('content').notEmpty().withMessage(message.notEmpty),

  body('slug')
    .notEmpty()
    .withMessage('Slug không được để trống')
    .custom(async (slug) => {
      if (!slug) throw new Error('Slug không hợp lệ')
      const existingSlug = await db.Post.findOne({
        where: { slug }
      })
      if (existingSlug) {
        throw new Error('Slug này đã tồn tại vui lòng thay đổi Slug')
      }
      return true
    })
]

module.exports = { validatePost }
