const Cities = require('../models/cities')

const findById = async (id) => {
  const city = await Cities.findById({ _id: id })
  return city
}

const findNearByCoord = async (lat, lng) => {
  const cities = await Cities.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat] },
        $maxDistance: 10000
      }
    }
  })
  return cities
}

module.exports = {
  findNearByCoord,
  findById
}
