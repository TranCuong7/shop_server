// validations/PostValidate.js
const { body } = require('express-validator')
const { message } = require('../constants/message')
const db = require('../models')

const validatePermission = [
  body('permissionName').custom(async (permissionName) => {
    const existingSlug = await db.Permission.findOne({
      where: { permissionName }
    })
    if (existingSlug) {
      throw new Error('permissionName này đã tồn tại vui lòng thay đổi permissionName')
    }
    return true
  })
]

module.exports = { validatePermission }
