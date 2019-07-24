const axios = require('axios')
const OPENWEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5'
const { OPENWEATHER_API_APPID } = require('../config')

const getWeatherByCityId = async (cityId) => {
  const response = await axios.get(`${OPENWEATHER_API_BASE_URL}/weather?id=${cityId}&APPID=${OPENWEATHER_API_APPID}&units=metric`)
  const { weather, sys, main, clouds, wind } = response.data
  const responseConverted = {
    type: weather[0].main,
    type_description: weather[0].description,
    sunrise: new Date(sys.sunrise * 1000).toISOString(),
    sunrset: new Date(sys.sunset * 1000).toISOString(),
    temp: main.temp,
    temp_min: main.temp_min,
    temp_max: main.temp_max,
    pressure: main.pressure,
    humidity: main.humidity,
    clouds_percent: clouds.all,
    wind_speed: wind.speed
  }
  return responseConverted
}

module.exports = {
  getWeatherByCityId
}
