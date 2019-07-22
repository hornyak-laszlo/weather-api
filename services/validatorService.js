const Joi = require('joi')
const { createBadRequestError } = require('../services/errorService')

const citySchema = Joi.object().keys({
  cityId: Joi.number().required()
})

const coordSchema = Joi.object().keys({
  lat: Joi.number().required(),
  lng: Joi.number().required()
})

const validateCoords = (req, res, next) => {
  const { error } = Joi.validate(req.query, coordSchema)
  if (error) {
    const errorMsg = createBadRequestError('lat/lng required')
    return res.status(400).json(errorMsg)
  }
  next()
}

const validateCity = (req, res, next) => {
  const { error } = Joi.validate(req.params, citySchema)
  if (error) {
    const errorMsg = createBadRequestError('cityId must be number')
    return res.status(400).json(errorMsg)
  }
  next()
}

module.exports = {
  validateCity,
  validateCoords
}