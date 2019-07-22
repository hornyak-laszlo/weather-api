const logger = require('./loggerService')

const createInternalServerError = (err) => {
  logger.error(`${err}`)
  return {
    code: 'InternalServerError',
    message: 'something wen\'t wrong'
  }
}

const createNotFoundError = () => ({
  code: 'NotFoundError',
  message: 'not found'
})

const createBadRequestError = (message) => ({
  code: 'BadRequestError',
  message
})

module.exports = {
  createInternalServerError,
  createNotFoundError,
  createBadRequestError
}
