const Cities = require('../models/cities')
const MAX_DISTANCE = 10000 // 10km

const findById = async (id) => {
  const city = await Cities.findById({ _id: id }, { name: 1, lat: 1, lng: 1 })
  return city
}

const findByName = async (name) => {
  const city = await Cities.findOne({ name: { $regex: `^${name}$`, $options: 'i' } }, { name: 1, lat: 1, lng: 1 })
  return city
}

const findNearByCoord = async (lat, lng) => {
  const cities = await Cities.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: MAX_DISTANCE
      }
    }
  }, { name: 1 })
  return cities
}

module.exports = {
  findByName,
  findNearByCoord,
  findById
}
