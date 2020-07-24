const request = require('supertest')
const app = require('../app')

const getWeatherTest = async () => {
  const result = await request(app)
    .get('/citiesByName/mannheim/weather')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(200)
  expect(result.body.type).toBeDefined()
  expect(result.body.type_description).toBeDefined()
  expect(result.body.sunrise).toBeDefined()
  expect(result.body.sunrset).toBeDefined()
  expect(result.body.temp).toBeDefined()
  expect(result.body.temp_min).toBeDefined()
  expect(result.body.temp_max).toBeDefined()
  expect(result.body.pressure).toBeDefined()
  expect(result.body.humidity).toBeDefined()
  expect(result.body.clouds_percent).toBeDefined()
  expect(result.body.wind_speed).toBeDefined()
}

const notFoundTest = async () => {
  const result = await request(app)
    .get('/citiesByName/mannheiim/weather')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(404)
  expect(result.body.code).toBe('NotFoundError')
  expect(result.body.message).toBe('not found')
}

const badRequestTest = async () => {
  const result = await request(app)
    .get('/citiesByName/1/weather')
    .set('Accept', 'application/json')
  expect(result.statusCode).toBe(400)
  expect(result.body.code).toBe('BadRequestError')
  expect(result.body.message).toBe('city name must be string')
}

module.exports = {
  getWeatherTest,
  notFoundTest,
  badRequestTest
}
