const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')

describe('GET /cities/?lat={latitude}&lng={longitude}', () => {
  it('should respond with the cities within 10km radius of Mannheim', async () => {
    const result = await request(app)
      .get('/cities?lat=49.48&lng=8.46')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(200)
    expect(result.body[0].name).to.be.equal('Mannheim')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities?lat=49.48&lng=a')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(400)
    expect(result.body.code).to.be.equal('BadRequestError')
    expect(result.body.message).to.be.equal('lat/lng required')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities?lat=49.48')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(400)
    expect(result.body.code).to.be.equal('BadRequestError')
    expect(result.body.message).to.be.equal('lat/lng required')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities?lng=8.46')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(400)
    expect(result.body.code).to.be.equal('BadRequestError')
    expect(result.body.message).to.be.equal('lat/lng required')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(400)
    expect(result.body.code).to.be.equal('BadRequestError')
    expect(result.body.message).to.be.equal('lat/lng required')
  })
})

describe('GET /cities/:cityId', () => {
  it('should respond with Mannheim city data', async () => {
    const result = await request(app)
      .get('/cities/2873891')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(200)
    expect(result.body.name).to.be.equal('Mannheim')
  })

  it('should respond with Not Found error', async () => {
    const result = await request(app)
      .get('/cities/1')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(404)
    expect(result.body.code).to.be.equal('NotFoundError')
    expect(result.body.message).to.be.equal('not found')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities/a')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(400)
    expect(result.body.code).to.be.equal('BadRequestError')
    expect(result.body.message).to.be.equal('cityId must be number')
  })
})

describe('GET /cities/:cityId/weather', () => {
  it('should respond with weather data for Mannheim', async () => {
    const result = await request(app)
      .get('/cities/2873891')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(200)
    expect(result.body.name).to.be.equal('Mannheim')
  })

  it('should respond with Not Found error', async () => {
    const result = await request(app)
      .get('/cities/1/weather')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(404)
    expect(result.body.code).to.be.equal('NotFoundError')
    expect(result.body.message).to.be.equal('not found')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities/a/weather')
      .set('Accept', 'application/json')
    expect(result.statusCode).to.be.equal(400)
    expect(result.body.code).to.be.equal('BadRequestError')
    expect(result.body.message).to.be.equal('cityId must be number')
  })
})
