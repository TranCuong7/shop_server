const { STATUS_CODE } = require('../constants')
const { message } = require('../constants/message')
const { approvedService } = require('../services/ApproveService')

class ApprovedController {
  async approved(req, res, next) {
    try {
      const { userId } = req.params
      const adminId = req.user.id
      const { approvalStatus } = req.body

      const result = await approvedService.approvedUser(userId, adminId, approvalStatus)

      return res.status(STATUS_CODE.OK).json({ message: message.updatedSuccessfully, data: result })
    } catch (error) {
      next(error)
    }
  }
}

const approvedController = new ApprovedController()
module.exports = { approvedController }
