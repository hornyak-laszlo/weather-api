const weatherService = require('../services/weatherService')
const citiesStorage = require('../storage/citiesStorage')
const logger = require('../winston')

const getCities = async (req, res) => {
  try {
    const { lat, lng } = req.query
    const cities = await citiesStorage.findNearByCoord(lat, lng)
    return res.status(200).json(cities)
  } catch (err) {
    logger.error(`${err}`)
    return res.status(500).json({
      code: 'InternalServerError',
      message: 'something wen\'t wrong'
    })
  }
}

const getCity = async (req, res) => {
  try {
    const { cityId } = req.params
    const city = await citiesStorage.findById(cityId)
    if (!city) {
      return res.status(404).json({
        code: 'NotFoundError',
        message: 'not found'
      })
    }
    return res.status(200).json(city)
  } catch (err) {
    logger.error(`${err}`)
    return res.status(500).json({
      code: 'InternalServerError',
      message: 'something wen\'t wrong'
    })
  }
}

const getWeatherByCity = async (req, res) => {
  try {
    const { cityId } = req.params
    const city = await citiesStorage.findById(cityId)
    if (!city) {
      return res.status(404).json({
        code: 'NotFoundError',
        message: 'not found'
      })
    }
    const response = await weatherService.getWeatherByCityId(cityId)
    return res.status(200).json(response)
  } catch (err) {
    logger.error(`${err}`)
    return res.status(500).json({
      code: 'InternalServerError',
      message: 'something wen\'t wrong'
    })
  }
}

module.exports = {
  getCities,
  getCity,
  getWeatherByCity
}
