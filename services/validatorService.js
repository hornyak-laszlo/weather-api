const Joi = require('joi')

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
    return res.status(400).json({
      code: 'BadRequestError',
      message: 'lat/lng required'
    })
  }
  next()
}

const validateCity = (req, res, next) => {
  const { error } = Joi.validate(req.params, citySchema)
  if (error) {
    return res.status(400).json({
      code: 'BadRequestError',
      message: 'cityId must be number'
    })
  }
  next()
}

module.exports = {
  validateCity,
  validateCoords
}
