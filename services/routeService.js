const express = require('express')
const { getCities, getCity, getWeatherByCity } = require('../controllers/weatherController')
const { validateCoords, validateCity } = require('./validatorService')
const apiRoutes = express.Router()

// Endpoints
apiRoutes.get('/cities', validateCoords, getCities)
apiRoutes.get('/cities/:cityId', validateCity, getCity)
apiRoutes.get('/cities/:cityId/weather', validateCity, getWeatherByCity)

module.exports = apiRoutes
