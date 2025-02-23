const { STATUS_CODE } = require('../constants')
const { authMapper } = require('../mappers/auth.mapper')
const AuthService = require('../services/AuthService')
const { json } = require('../utils/APIResponse')
const db = require('../models')

const login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const { token, user } = await AuthService.login({ username, password })
    await AuthService.createAccessLog({
      accessType: 'USER',
      modalId: user.id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      accessToken: token
    })
    const data = authMapper(token, user)
    return json(res, STATUS_CODE.OK, 'Đăng nhập thành công', data)
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1]
  try {
    await AuthService.logout({ token })
    return json(res, STATUS_CODE.OK, 'Đăng xuất thành công')
  } catch (e) {
    next(e)
  }
}

module.exports = { login, logout }
