const createInternalServerError = (err) => {
  console.error(`${err}`)
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
