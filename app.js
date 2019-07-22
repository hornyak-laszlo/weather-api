const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./winston')
const mongoose = require('mongoose')

const weatherController = require('./controllers/weatherController')

const { MONGO_URL } = require('./config')
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection
db.on('error', (err) => logger.error('Mongoose connection error', err))
db.once('open', () => logger.info('Mongoose connected successfully'))

// Set up Express Server
const port = process.env.PORT || 3000
const app = express()
app.set('port', port)
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(helmet.noCache())

const prodFormat = ':method :url :status :response-time ms'
const morganFormat = (process.env.NODE_ENV === 'production') ? prodFormat : 'dev'
app.use(morgan(morganFormat, { stream: logger.stream }))

const apiRoutes = express.Router()
app.use('/', apiRoutes)

const server = require('http').Server(app)
server.listen(app.get('port'), () => {
  logger.info(`App is listening on port ${app.get('port')}`)
})

// Endpoints
apiRoutes.get('/cities', weatherController.getCities)
apiRoutes.get('/cities/:cityId', weatherController.getCity)
apiRoutes.get('/cities/:cityId/weather', weatherController.getWeatherByCity)

module.exports = app
