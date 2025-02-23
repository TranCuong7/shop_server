const { body, query } = require('express-validator')
const { message } = require('../constants/message')
const RoleService = require('../services/RoleService')
const { STATUS_CODE } = require('../constants')
const { PERMISSIONS } = require('../constants/index')
const db = require('../models')

const bodyInfo = [
  body('roleName')
    .notEmpty()
    .bail()
    .withMessage(message.notEmpty)
    .isLength({ max: 100 })
    .withMessage(message.isLength(null, 100))
    .bail()
    .custom(async (roleName, { req }) => {
      const { id } = req.body
      let data = { roleName }
      if (id) data.notInIds = [id]

      const getRole = await RoleService.getRole(data)

      if (getRole.status === STATUS_CODE.OK) throw new Error(message.isExisted)

      return true
    }),
  body('roleSlug')
    .notEmpty()
    .bail()
    .withMessage(message.notEmpty)
    .isLength({ max: 50 })
    .withMessage(message.isLength(null, 50))
    .bail()
    .custom(async (roleSlug, { req }) => {
      const { id } = req.body
      let data = { roleSlug }
      if (id) data.notInIds = [id]

      const getRole = await RoleService.getRole(data)

      if (getRole.status === STATUS_CODE.OK) throw new Error(message.isExisted)

      return true
    }),
  body('permissionIds')
    .notEmpty()
    .bail()
    .withMessage(message.notEmpty)
    .bail()
    .isArray()
    .withMessage(message.isArray)
    .custom(async (permissionIds) => {
      const existingPermissionIds = await db.Permission.findOne({
        where: { permissionIds }
      })
      if (existingPermissionIds) {
        throw new Error('permissionIds này đã tồn tại vui lòng thay đổi')
      }
      return true
    })
]

const create = [...bodyInfo]

const update = [
  body('id')
    .notEmpty()
    .bail()
    .withMessage(message.notEmpty)
    .custom(async (id, { req }) => {
      const getRole = await RoleService.getRole({
        id: id
      })

      if (getRole.status !== STATUS_CODE.OK) throw new Error(message.notExist)

      req.role = getRole.data

      return true
    }),
  ...bodyInfo
]

const show = [
  query('id')
    .notEmpty()
    .bail()
    .withMessage(message.notEmpty)
    .custom(async (id, { req }) => {
      const getRole = await RoleService.getRole({
        id: id
      })

      if (getRole.status !== STATUS_CODE.OK) throw new Error(message.notExist)

      req.role = getRole.data

      return true
    })
]

const destroy = [
  body('ids').notEmpty().bail().withMessage(message.notEmpty).bail().isArray().withMessage(message.isArray),
  body('ids.*').custom(async (id, { req }) => {
    if (id === 1) throw new Error(message.youDoNotHaveAccess)

    const getRole = await RoleService.getRole({
      id: id
    })

    if (getRole.status !== STATUS_CODE.OK) throw new Error(message.notExist)

    req.role = getRole.data

    return true
  })
]

module.exports = { create, show, update, destroy }
