const winston = require('winston')
require('winston-daily-rotate-file')
const { combine, colorize, printf, timestamp } = winston.format

const env = process.env.NODE_ENV || 'development'

const fileLogger = new winston.transports.DailyRotateFile({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info',
  handleExceptions: true,
  colorize: false,
  format: combine(
    timestamp(),
    printf(info => {
      return `[${info.timestamp}] [${info.level}] => ${info.message}`
    })
  )
})

const consoleLogger = new winston.transports.Console({
  level: (env === 'development') ? 'debug' : 'error',
  handleExceptions: true,
  colorize: true,
  format: combine(
    colorize(),
    timestamp(),
    printf(info => {
      return `[${info.timestamp}] [${info.level}] => ${info.message}`
    })
  )
})

const transports = (env === 'production') ? [fileLogger] : [consoleLogger]

const logger = winston.createLogger({
  transports,
  exitOnError: false
})

// eslint-disable-next-line fp/no-mutation
logger.stream = {
  write: (message) => {
    logger.info(message)
  }
}

module.exports = logger
