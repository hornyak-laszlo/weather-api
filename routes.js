const express = require('express')
const weatherController = require('./controllers/weatherController')

const apiRoutes = express.Router()

// Endpoints
apiRoutes.get('/cities', weatherController.getCities)
apiRoutes.get('/cities/:cityId', weatherController.getCity)
apiRoutes.get('/cities/:cityId/weather', weatherController.getWeatherByCity)

module.exports = apiRoutes
