const app = require('../app')
const Cities = require('../models/cities')
const weatherTests = require('./weather.test')
const cityTests = require('./city.test')
const citiesListTests = require('./citiesList.test')
const cityNameTests = require('./cityName.test')
const weatherByCityNameTests = require('./weatherByCityName.test')

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
  it('should respond with the cities within 10km radius of Mannheim', citiesListTests.getCitiesList)
  it('should respond with Bad Request error', citiesListTests.badRequestInvalidLngTest)
  it('should respond with Bad Request error if lng missing', citiesListTests.badRequestLngRequiredTest)
  it('should respond with Bad Request error if lat missing', citiesListTests.badRequestLatRequiredTest)
  it('should respond with Bad Request error if lat and lng missing', citiesListTests.badRequestLatLngRequiredTest)
})

describe('GET /cities/:cityId', () => {
  it('should respond with Mannheim city data', cityTests.getCityTest)
  it('should respond with Not Found error', cityTests.notFoundTest)
  it('should respond with Bad Request error', cityTests.badRequestTest)
})

describe('GET /cities/:cityId/weather', () => {
  it('should respond with weather data for Mannheim', weatherTests.getWeatherTest)
  it('should respond with Not Found error', weatherTests.notFoundTest)
  it('should respond with Bad Request error', weatherTests.badRequestTest)
})

describe('GET /citiesByName/:name', () => {
  it('should respond with Mannheim city data', cityNameTests.getCityTest)
  it('should respond with Not Found error', cityNameTests.notFoundTest)
  it('should respond with Bad Request error', cityNameTests.badRequestTest)
})

describe('GET /citiesByName/:name/weather', () => {
  it('should respond with weather data for Mannheim', weatherByCityNameTests.getWeatherTest)
  it('should respond with Not Found error', weatherByCityNameTests.notFoundTest)
  it('should respond with Bad Request error', weatherByCityNameTests.badRequestTest)
})
