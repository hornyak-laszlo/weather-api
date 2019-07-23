const devConfig = require('./config/development.js')
const prodConfig = require('./config/production.js')
const testConfig = require('./config/test.js')

const env = process.env.NODE_ENV || 'development'
const config = env === 'production' ? prodConfig : env === 'test' ? testConfig : devConfig

module.exports = config
