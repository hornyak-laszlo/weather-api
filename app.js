const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const apiRoutes = require('./services/routeService')
const noCache = require('nocache')

const { MONGO_URL } = require('./config')
mongoose.connect(MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => console.error('Mongoose connection error', err))
db.once('open', () => console.log('Mongoose connected successfully'))

// Set up Express Server
const port = process.env.PORT || 3000
const app = express()
app.set('port', port)
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(noCache())

const morganFormat = (process.env.NODE_ENV === 'production') ? ':method :url :status :response-time ms' : 'dev'
app.use(morgan(morganFormat))

app.use('/', apiRoutes)

const server = app.listen(app.get('port'), () => {
  console.log(`App is listening on port ${app.get('port')}`)
})

module.exports = server
