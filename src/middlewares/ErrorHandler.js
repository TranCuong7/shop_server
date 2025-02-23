const multer = require('multer')
const { STATUS_CODE } = require('../constants')
const HttpException = require('../exceptions/HttpException')
const { message } = require('../constants/message')

class ErrorHandler {
  constructor() {
    this.handle = this.handle.bind(this)
  }

  handleHttpException(error, res) {
    return res.status(error.status).json({ status: error.status, messages: error.message })
  }

  handleMulterError(error, res) {
    const messageMap = {
      LIMIT_PART_COUNT: 'Quá nhiều phần dữ liệu',
      LIMIT_FILE_SIZE: 'Tập tin quá lớn (tối đa 2MB)',
      LIMIT_FILE_COUNT: 'Quá nhiều tập tin',
      LIMIT_FIELD_KEY: 'Tên trường quá dài',
      LIMIT_FIELD_VALUE: 'Giá trị trường quá dài',
      LIMIT_FIELD_COUNT: 'Quá nhiều trường dữ liệu',
      LIMIT_UNEXPECTED_FILE: 'Trường tập tin không hợp lệ',
      MISSING_FIELD_NAME: 'Thiếu tên trường',
      INVALID_EXTENSION: 'Định dạng tập tin không hợp lệ',
      UNEXPECTED_FILE: 'File đính kèm không hợp lệ hoặc chưa đính kèm',
      ABC: 'Chưa đính kèm'
    }

    const errorMessage = messageMap[error.code] || error.message || message.invalid
    return res.status(STATUS_CODE.BAD_REQUEST).json({ status: STATUS_CODE.BAD_REQUEST, message: errorMessage })
  }

  handleGenericError(res) {
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ status: STATUS_CODE.INTERNAL_SERVER_ERROR, message: message.invalid })
  }

  handle(error, req, res, next) {
    this.logger(error)
    switch (true) {
      case error instanceof HttpException:
        return this.handleHttpException(error, res)
      case error instanceof multer.MulterError:
        return this.handleMulterError(error, res)
      default:
        return this.handleGenericError(res)
    }
  }

  logger(error) {
    console.error(`Error: ${error.message}`)
    console.error(`Stack: ${error.stack}`)
  }
}

const errorHandler = new ErrorHandler()
module.exports = { errorHandler }
