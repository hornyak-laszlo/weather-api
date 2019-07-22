const weatherService = require('../services/weatherService')
const citiesStorage = require('../storage/citiesStorage')
const Joi = require('joi')
const citySchema = Joi.object().keys({
  cityId: Joi.number().required()
})

const coordSchema = Joi.object().keys({
  lat: Joi.number().required(),
  lng: Joi.number().required()
})

const getCities = async (req, res) => {
  try {
    const { error, value } = Joi.validate(req.query, coordSchema)
    if (error) {
      return res.status(400).json({
        code: 'BadRequestError',
        message: 'lat/lng required'
      })
    }
    const { lat, lng } = value
    const cities = await citiesStorage.findNearByCoord(lat, lng)
    return res.status(200).json(cities)
  } catch (err) {
    return res.status(400).json({
      code: 'BadRequestError',
      message: 'Unknown error'
    })
  }
}

const getCity = async (req, res) => {
  try {
    const { error, value } = Joi.validate(req.params, citySchema)
    if (error) {
      return res.status(400).json({
        code: 'BadRequestError',
        message: 'cityId must be number'
      })
    }
    const { cityId } = value
    const city = await citiesStorage.findById(cityId)
    if (!city) {
      return res.status(404).json({
        code: 'NotFoundError',
        message: 'not found'
      })
    }
    return res.status(200).json(city)
  } catch (err) {
    return res.status(400).json({
      code: 'BadRequestError',
      message: 'Unknown error'
    })
  }
}

const getWeatherByCity = async (req, res) => {
  try {
    const { error, value } = Joi.validate(req.params, citySchema)
    if (error) {
      return res.status(400).json({
        code: 'BadRequestError',
        message: 'cityId must be number'
      })
    }
    const { cityId } = value
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
    return res.status(400).json({
      code: 'BadRequestError',
      message: 'Unknown error'
    })
  }
}

module.exports = {
  getCities,
  getCity,
  getWeatherByCity
}
