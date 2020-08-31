
const logger = {
  log: function(level, obj, message) {
    if (!message) {
      if (process.env.NODE_ENV === 'production') {
        console.log(level, obj)
      } else {
        console.log(level, obj, '\x1b[0m')
      }
    } else {
      if (process.env.NODE_ENV === 'production') {
        console.log(level, message, obj)
      } else {
        console.log(level, message + '\x1b[0m', obj)
      }
    }
  },
  info: function(obj, message) {
    if (process.env.NODE_ENV !== 'production') process.stdout.write('\x1b[36m')
    logger.log('[INFO]', obj, message)
  },
  warn: function(obj, message) {
    if (process.env.NODE_ENV !== 'production') process.stdout.write('\x1b[35m')
    logger.log('[WARNING]', obj, message)
  },
  error: function(obj, message) {
    if (process.env.NODE_ENV !== 'production') process.stdout.write('\x1b[31m')
    logger.log('[ERROR]', obj, message)
  },
  fatal: function(obj, message) {
    if (process.env.NODE_ENV !== 'production') process.stdout.write('\x1b[31m')
    logger.log('[FATAL]', obj, message)
  },
}

export default logger