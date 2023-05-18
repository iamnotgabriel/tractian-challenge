import { configuration } from '@/resources/context/configuration'
import { getLogger } from '@/resources/logging'
import { type NextFunction, type Request, type Response } from 'express'

const logger = getLogger('HTTP')

export function loggingMiddleware (req: Request, res: Response, next: NextFunction): void {
  if (configuration.httpLogging) {
    logger.info(`${req.method} ${req.path}`)
  }
  next()
}
