const request = require('supertest')
const app = require('../app')
const Cities = require('../models/cities')

beforeAll(async () => {
  await Cities.create({
    _id: 2873891,
    location: {
      coordinates: [
        8.46472,
        49.488331
      ],
      type: 'Point'
    },
    name: 'Mannheim',
    country: 'DE',
    lat: 49.488331,
    lng: 8.46472
  })
})

afterAll(async () => {
  await Cities.deleteOne({ _id: 2873891 })
  await app.close()
})

describe('GET /cities/?lat={latitude}&lng={longitude}', () => {
  it('should respond with the cities within 10km radius of Mannheim', async () => {
    const result = await request(app)
      .get('/cities?lat=49.48&lng=8.46')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(200)
    expect(result.body[0].name).toBe('Mannheim')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities?lat=49.48&lng=a')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(400)
    expect(result.body.code).toBe('BadRequestError')
    expect(result.body.message).toBe('lat/lng required')
  })

  it('should respond with Bad Request error if lng missing', async () => {
    const result = await request(app)
      .get('/cities?lat=49.48')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(400)
    expect(result.body.code).toBe('BadRequestError')
    expect(result.body.message).toBe('lat/lng required')
  })

  it('should respond with Bad Request error if lat missing', async () => {
    const result = await request(app)
      .get('/cities?lng=8.46')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(400)
    expect(result.body.code).toBe('BadRequestError')
    expect(result.body.message).toBe('lat/lng required')
  })

  it('should respond with Bad Request error if lat and lng missing', async () => {
    const result = await request(app)
      .get('/cities')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(400)
    expect(result.body.code).toBe('BadRequestError')
    expect(result.body.message).toBe('lat/lng required')
  })
})

describe('GET /cities/:cityId', () => {
  it('should respond with Mannheim city data', async () => {
    const result = await request(app)
      .get('/cities/2873891')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(200)
    expect(result.body.name).toBe('Mannheim')
  })

  it('should respond with Not Found error', async () => {
    const result = await request(app)
      .get('/cities/1')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(404)
    expect(result.body.code).toBe('NotFoundError')
    expect(result.body.message).toBe('not found')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities/a')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(400)
    expect(result.body.code).toBe('BadRequestError')
    expect(result.body.message).toBe('cityId must be number')
  })
})

describe('GET /cities/:cityId/weather', () => {
  it('should respond with weather data for Mannheim', async () => {
    const result = await request(app)
      .get('/cities/2873891/weather')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(200)
    expect(result.body.name).toBe('Mannheim')
  })

  it('should respond with Not Found error', async () => {
    const result = await request(app)
      .get('/cities/1/weather')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(404)
    expect(result.body.code).toBe('NotFoundError')
    expect(result.body.message).toBe('not found')
  })

  it('should respond with Bad Request error', async () => {
    const result = await request(app)
      .get('/cities/a/weather')
      .set('Accept', 'application/json')
    expect(result.statusCode).toBe(400)
    expect(result.body.code).toBe('BadRequestError')
    expect(result.body.message).toBe('cityId must be number')
  })
})
