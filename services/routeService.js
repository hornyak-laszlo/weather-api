const express = require('express')
const { getCities, getCity, getWeatherByCity, getCityByName, getWeatherByCityName } = require('../controllers/weatherController')
const { validateCoords, validateCity, validateCityName } = require('./validatorService')
const apiRoutes = express.Router()

// Endpoints
apiRoutes.get('/cities', validateCoords, getCities)
apiRoutes.get('/cities/:cityId', validateCity, getCity)
apiRoutes.get('/cities/:cityId/weather', validateCity, getWeatherByCity)

apiRoutes.get('/citiesByName/:name', validateCityName, getCityByName)
apiRoutes.get('/citiesByName/:name/weather', validateCityName, getWeatherByCityName)

module.exports = apiRoutes
