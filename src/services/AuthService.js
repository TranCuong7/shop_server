const db = require('../models')
const ServiceException = require('../exceptions/ServiceException')
const UserService = require('../services/UserService')
const bcrypt = require('bcrypt')
const { createJWT } = require('../middlewares/JWTAction')

const login = async ({ username, password }) => {
  const user = await UserService.getUseByUserName({ username })
  if (!user) {
    throw new ServiceException('Không tìm thấy thông tin người dùng')
  }
  const userPwd = user?.password
  const matchedPassword = bcrypt.compareSync(password, userPwd)
  if (!matchedPassword) {
    throw new ServiceException('Mật khẩu không khớp')
  }
  const token = createJWT(user.id)

  return { user, token }
}

const createAccessLog = async ({ accessType, modalId, ipAddress, userAgent, accessToken }) => {
  try {
    await db.AccessLog.create({
      accessType,
      modalId,
      ipAddress,
      userAgent,
      accessToken,
      createdBy: modalId,
      updatedBy: modalId
    })
  } catch (e) {
    throw new ServiceException('Lỗi khi xác thực người dùng: ', e.message)
  }
}
const logout = async ({ token }) => {
  const authToken = await db.AccessLog.findOne({
    where: {
      accessToken: token
    }
  })
  if (!authToken) {
    throw new ServiceException('Không tìm thấy token')
  }

  try {
    await authToken.update({ logoutAt: new Date() })
    return true
  } catch (error) {
    throw new ServiceException(error.message)
  }
}

module.exports = { createAccessLog, login, logout }
