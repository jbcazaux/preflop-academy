import 'server-only'

import pino from 'pino'

const logger = pino({
  level: process.env.APP_LOG_LEVEL || 'error',
})

export default logger
