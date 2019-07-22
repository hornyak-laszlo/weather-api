const axios = require('axios')
const OPENWEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5'
const { OPENWEATHER_API_APPID } = require('../config')

const getWeatherByCityId = async (cityId) => {
  const response = await axios.get(`${OPENWEATHER_API_BASE_URL}/weather?id=${cityId}&APPID=${OPENWEATHER_API_APPID}`)
  return response.data
}

module.exports = {
  getWeatherByCityId
}
