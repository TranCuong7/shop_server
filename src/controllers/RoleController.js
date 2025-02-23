const { STATUS_CODE } = require('../constants')
const { message } = require('../constants/message')
const RoleService = require('../services/RoleService')
const { sendResponse } = require('../utils/APIResponse')

const create = async (req, res) => {
  try {
    const { user } = req
    const { roleName, roleSlug, permissionIds } = req.body

    const createRole = await RoleService.create({
      roleName,
      roleSlug,
      userId: user.id,
      permissionIds
    })

    const role = createRole.data

    sendResponse(res, {
      status: STATUS_CODE.OK,
      messages: message.createdSuccessfully,
      data: role
    })
  } catch (e) {
    sendResponse(res, {
      status: e.status,
      messages: e.message
    })
  }
}

const shows = async (req, res) => {
  try {
    const { page, limit } = req.query

    const roles = await RoleService.shows({ page, limit })

    sendResponse(res, {
      status: STATUS_CODE.OK,
      data: roles
    })
  } catch (e) {
    sendResponse(res, {
      status: e.status,
      messages: e.message
    })
  }
}

const show = async (req, res) => {
  try {
    const { role } = req
    const { id } = req.query

    const getPermissions = await RoleService.getPermissionsByRoleId({ roleId: id })

    sendResponse(res, {
      status: STATUS_CODE.OK,
      data: { ...role, permissions: getPermissions.data }
    })
  } catch (e) {
    sendResponse(res, {
      status: e.status,
      messages: e.message
    })
  }
}

const update = async (req, res) => {
  try {
    const { user } = req
    const { id, roleName, roleSlug, permissionIds } = req.body

    await RoleService.update({
      id,
      roleName,
      roleSlug,
      userId: user.id,
      permissionIds
    })

    sendResponse(res, {
      status: STATUS_CODE.OK,
      messages: message.updatedSuccessfully
    })
  } catch (e) {
    sendResponse(res, {
      status: e.status,
      messages: e.message
    })
  }
}

const destroy = async (req, res) => {
  try {
    const { user } = req
    const { ids } = req.body

    await RoleService.destroy({
      ids,
      userId: user.id
    })

    sendResponse(res, {
      status: STATUS_CODE.OK,
      messages: message.deletedSuccessfully
    })
  } catch (e) {
    sendResponse(res, {
      status: e.status,
      messages: e.message
    })
  }
}

const permissionShows = async (req, res) => {
  try {
    const { page, limit } = req.query

    const permissions = await RoleService.permissionShows({ page, limit })

    sendResponse(res, {
      status: STATUS_CODE.OK,
      data: permissions
    })
  } catch (e) {
    sendResponse(res, {
      status: e.status,
      messages: e.message
    })
  }
}

module.exports = { create, shows, show, update, destroy, permissionShows }
