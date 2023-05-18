import { configuration } from '@/resources/context/configuration'
import { type Logger, createLogger, format, transports } from 'winston'
const logger = createLogger({
  transports: [new transports.Console({
    silent: configuration.silenceLogging
  })],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, service, message }) => `[${timestamp}] ${level} (${service}): ${message}`)
  )
})

export function getLogger (service: string): Logger {
  return logger.child({ service })
}
