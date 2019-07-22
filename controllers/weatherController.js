const weatherService = require('../services/weatherService')
const citiesStorage = require('../storage/citiesStorage')
const { createNotFoundError, createInternalServerError } = require('../services/errorService')

const getCities = async (req, res) => {
  try {
    const { lat, lng } = req.query
    const cities = await citiesStorage.findNearByCoord(lat, lng)
    return res.status(200).json(cities)
  } catch (err) {
    const errorMsg = createInternalServerError(err)
    return res.status(500).json(errorMsg)
  }
}

const getCity = async (req, res) => {
  try {
    const { cityId } = req.params
    const city = await citiesStorage.findById(cityId)
    if (!city) {
      const errorMsg = createNotFoundError()
      return res.status(404).json(errorMsg)
    }
    return res.status(200).json(city)
  } catch (err) {
    const errorMsg = createInternalServerError(err)
    return res.status(500).json(errorMsg)
  }
}

const getWeatherByCity = async (req, res) => {
  try {
    const { cityId } = req.params
    const city = await citiesStorage.findById(cityId)
    if (!city) {
      const errorMsg = createNotFoundError()
      return res.status(404).json(errorMsg)
    }
    const response = await weatherService.getWeatherByCityId(cityId)
    return res.status(200).json(response)
  } catch (err) {
    const errorMsg = createInternalServerError(err)
    return res.status(500).json(errorMsg)
  }
}

module.exports = {
  getCities,
  getCity,
  getWeatherByCity
}
