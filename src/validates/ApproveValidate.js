const { body } = require('express-validator')
const { message } = require('../constants/message')

const allowedApprovalStatuses = ['Đang chờ', 'Đã duyệt', 'Từ chối']

const approveUserValidate = [
  body('approvalStatus')
    .notEmpty()
    .withMessage(message.notEmpty)
    .custom((value) => {
      if (!allowedApprovalStatuses.includes(value)) {
        throw new Error('Giá trị approvalStatus phải là "Đang chờ", "Đã duyệt" hoặc "Từ chối"')
      }
      return true
    })
]

module.exports = { approveUserValidate }
