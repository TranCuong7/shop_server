const { STATUS_CODE } = require('../constants')
const HttpException = require('./HttpException')

class BadRequestException extends HttpException {
  constructor(message, status = STATUS_CODE.BAD_REQUEST) {
    super(message)
    this.status = status
  }
}

module.exports = BadRequestException
