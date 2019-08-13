const request = require('supertest')
const app = require('../app')

const getCitiesList = async () => {
  const result = await request(app)
    .get('/cities?lat=49.48&lng=8.46')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(200)
  expect(result.body[0].name).toBe('Mannheim')
}

const badRequestInvalidLngTest = async () => {
  const result = await request(app)
    .get('/cities?lat=49.48&lng=a')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(400)
  expect(result.body.code).toBe('BadRequestError')
  expect(result.body.message).toBe('lat/lng required')
}

const badRequestLngRequiredTest = async () => {
  const result = await request(app)
    .get('/cities?lat=49.48')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(400)
  expect(result.body.code).toBe('BadRequestError')
  expect(result.body.message).toBe('lat/lng required')
}

const badRequestLatRequiredTest = async () => {
  const result = await request(app)
    .get('/cities?lng=8.46')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(400)
  expect(result.body.code).toBe('BadRequestError')
  expect(result.body.message).toBe('lat/lng required')
}

const badRequestLatLngRequiredTest = async () => {
  const result = await request(app)
    .get('/cities')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(400)
  expect(result.body.code).toBe('BadRequestError')
  expect(result.body.message).toBe('lat/lng required')
}

module.exports = {
  getCitiesList,
  badRequestInvalidLngTest,
  badRequestLngRequiredTest,
  badRequestLatRequiredTest,
  badRequestLatLngRequiredTest
}
