const { STATUS_CODE } = require('../constants')
const HttpException = require('./HttpException')

class ServiceException extends HttpException {
  constructor(message, status = STATUS_CODE.BAD_REQUEST) {
    super(message, status)
    this.message = message
  }
}

module.exports = ServiceException
