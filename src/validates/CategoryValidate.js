// validations/PostValidate.js
const { body } = require('express-validator')
const { message } = require('../constants/message')

const post = [
  body('name').notEmpty().withMessage(message.notEmpty).bail().isLength({ max: 255 }).withMessage(message.isLength),
  body('slug').notEmpty().withMessage(message.notEmpty),
  body('type').notEmpty().withMessage(message.notEmpty)
]

module.exports = { post }
