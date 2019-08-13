const request = require('supertest')
const app = require('../app')

const getCityTest = async () => {
  const result = await request(app)
    .get('/cities/2873891')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(200)
  expect(result.body.name).toBe('Mannheim')
}

const notFoundTest = async () => {
  const result = await request(app)
    .get('/cities/1')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(404)
  expect(result.body.code).toBe('NotFoundError')
  expect(result.body.message).toBe('not found')
}

const badRequestTest = async () => {
  const result = await request(app)
    .get('/cities/a')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(400)
  expect(result.body.code).toBe('BadRequestError')
  expect(result.body.message).toBe('cityId must be number')
}

module.exports = {
  getCityTest,
  notFoundTest,
  badRequestTest
}
