const request = require('supertest')
const app = require('../app')

const getCityTest = async () => {
  const result = await request(app)
    .get('/citiesByName/mannheim')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(200)
  expect(result.body.name).toBe('Mannheim')
}

const notFoundTest = async () => {
  const result = await request(app)
    .get('/citiesByName/mannheiiim')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(404)
  expect(result.body.code).toBe('NotFoundError')
  expect(result.body.message).toBe('not found')
}

const badRequestTest = async () => {
  const result = await request(app)
    .get('/citiesByName/1')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(400)
  expect(result.body.code).toBe('BadRequestError')
  expect(result.body.message).toBe('city name must be string')
}

module.exports = {
  getCityTest,
  notFoundTest,
  badRequestTest
}
