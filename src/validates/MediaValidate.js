const { body } = require('express-validator')
const { message } = require('../constants/message')
const { param } = require('express-validator')
const db = require('../models')

const files = [
  body('files').custom((value, { req }) => {
    if (!req.file && !req.body.videoUrl) {
      throw new Error('Bạn phải upload một file hoặc cung cấp một URL YouTube.')
    }
    return true
  })

  // body('videoUrl').optional().isURL().withMessage('URL không hợp lệ').withMessage('Chỉ hỗ trợ URL')
]

const update = [
  param('id')
    .notEmpty()
    .withMessage(message.notEmpty)
    .bail()
    .isInt({ min: 1 })
    .withMessage(message.invalid)
    .custom(async (id) => {
      const existingUrl = await db.Image.findByPk(id)
      if (!existingUrl) {
        throw new Error('Không tìm thấy url ảnh với ID này')
      }
      return true
    })
]

const destroy = [
  param('id')
    .notEmpty()
    .withMessage(message.notEmpty)
    .bail()
    .isInt({ min: 1 })
    .withMessage(message.invalid)
    .custom(async (id) => {
      const existingUrl = await db.Image.findByPk(id)
      if (!existingUrl) {
        throw new Error('Không tìm thấy url ảnh với ID này')
      }
      return true
    })
]

module.exports = { files, destroy, update }
