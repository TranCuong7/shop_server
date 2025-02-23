const db = require('../models')
const { message } = require('../constants/message')
const ServiceException = require('../exceptions/ServiceException')
const NotFoundException = require('../exceptions/NotFoundException')

class ApprovedService {
  async approvedUser(userId, adminId, approvalStatus) {
    const user = await db.Company.findByPk(userId)

    if (!user) {
      throw new NotFoundException('Không tìm thấy thành viên')
    }

    if (!user.userAvatar) {
      throw new ServiceException('Cập nhật logo trước khi duyệt thành viên')
    }

    user.approvalStatus = approvalStatus
    user.approvedBy = adminId
    user.approvedAt = new Date()

    await user.save()
  }
}

const approvedService = new ApprovedService()
module.exports = { approvedService }
