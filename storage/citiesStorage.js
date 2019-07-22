const Cities = require('../models/cities')
const MAX_DISTANCE = 10000 // 10km

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
        $maxDistance: MAX_DISTANCE
      }
    }
  })
  return cities
}

module.exports = {
  findNearByCoord,
  findById
}
