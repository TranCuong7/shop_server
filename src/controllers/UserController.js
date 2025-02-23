const { STATUS_CODE } = require('../constants')
const { message } = require('../constants/message')
const UserService = require('../services/UserService')
const { sendResponse } = require('../utils/APIResponse')

const create = async (req, res) => {
  try {
    const { user } = req
    const { roleId, userCode, userFullName, userEmail, userPhone, userAddress, userAvatar, account, companyName, position, password } = req.body

    const createUser = await UserService.create({
      roleId,
      userCode,
      userFullName,
      userEmail,
      userPhone,
      userAddress,
      userAvatar,
      account,
      companyName,
      position,
      password,
      userId: user.id
    })

    const userData = createUser.data

    sendResponse(res, {
      status: STATUS_CODE.OK,
      messages: message.createdSuccessfully,
      data: userData
    })
  } catch (e) {
    sendResponse(res, {
      status: e.status,
      messages: e.message
    })
  }
}
//tao thong tin cong ty doi tac
const createAvatar = async (req, res) => {
  try {
    const { userEmail, userFullName, userPhone } = req.body
    const userAvatar = req.processedFiles?.[0]?.relativePath || ''

    const createUser = await UserService.createAvatar({
      userFullName,
      userEmail,
      userPhone,
      userAvatar
    })

    const userData = createUser.data

    sendResponse(res, {
      status: STATUS_CODE.OK,
      messages: message.createdSuccessfully,
      data: userData
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
    const { userData } = req

    sendResponse(res, {
      status: STATUS_CODE.OK,
      data: userData
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

    const users = await UserService.shows({ page, limit })

    sendResponse(res, {
      status: STATUS_CODE.OK,
      data: users
    })
  } catch (e) {
    sendResponse(res, {
      status: e.status,
      messages: e.message
    })
  }
}
const showUserAvatar = async (req, res) => {
  try {
    const { page, limit } = req.query

    const users = await UserService.showUserAvatar({ page, limit })

    sendResponse(res, {
      status: STATUS_CODE.OK,
      data: users
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
    const { id, roleId, userCode, userFullName, userEmail, userPhone, userAvatar, userAddress, account, companyName, position, password } = req.body

    await UserService.update({
      id,
      roleId,
      userCode,
      userFullName,
      userEmail,
      userPhone,
      userAvatar,
      userAddress,
      account,
      companyName,
      position,
      password,
      userId: user.id
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

    await UserService.destroy({
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

module.exports = { create, show, shows, update, destroy, showUserAvatar, createAvatar }
