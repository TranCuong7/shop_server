const { body, param, query } = require('express-validator')
const { message } = require('../constants/message')
const db = require('../models')

const partnerCreateValidate = [
  body('userFullName').notEmpty().withMessage('Tên không được để trống').isLength({ max: 255 }).withMessage(message.CharacterLimitExceeded),

  body('userPhone').notEmpty().withMessage('Số điện thoại không được để trống'),

  body('companyName').notEmpty().withMessage('Tên công ty không được để trống').isLength({ max: 255 }).withMessage(message.CharacterLimitExceeded),

  body('businessField')
    .notEmpty()
    .withMessage('Lĩnh vực kinh doanh không được để trống')
    .isLength({ max: 255 })
    .withMessage(message.CharacterLimitExceeded)

  // body('userAvatar').notEmpty().isString().withMessage('Ảnh đại diện không được để trống')
]

const partnerDeleteValidate = [
  param('id')
    .notEmpty()
    .withMessage('ID không được để trống')
    .isInt({ min: 1 })
    .withMessage('ID phải là một số nguyên dương')
    .custom(async (id) => {
      const existingUser = await db.Company.findByPk(id)
      if (!existingUser) {
        throw new Error('Không tìm thấy người dùng với ID này')
      }
      return true
    })
]

module.exports = { partnerCreateValidate, partnerDeleteValidate }
