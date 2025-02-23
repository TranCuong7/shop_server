const { body } = require('express-validator')
const { message } = require('../constants/message')

const login = [body('username').notEmpty().bail().withMessage(message.notEmpty), body('password').notEmpty().bail().withMessage(message.notEmpty)]

module.exports = { login }
