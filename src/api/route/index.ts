import { type Result } from '@/use-case/commons'
import { type Request, type Response, type Router } from 'express'
import { type HttpResponse } from '../http/http-response'
import { getLogger } from '@/resources/logging'

export type UseCaseCallback<T> = () => Promise<Result<T>>
export type ResponseCallback<T> = (result: T) => void

const logger = getLogger('HTTP')

export abstract class Route {
  abstract handle (req: Request): Promise<Result<HttpResponse>>

  protected get handler () {
    return async (req: Request, res: Response) => {
      const result = await this.handle(req)
      if (result.ok) {
        const { value } = result
        res.status(value.status)
        this.setHeaders(res, value.headers)
        res.json(value.body)
      } else {
        const error = (result as Result.Err).error
        logger.warn(`${req.method} ${req.path} error=${error.message}`)
        res.status(error.errorCode).json(error.toJson())
      }
    }
  }

  private setHeaders (res: Response, headers: HttpResponse['headers']): void {
    if (headers) {
      for (const header in headers) {
        res.setHeader(header, headers[header])
      }
    }
  }

  abstract register (router: Router): void

  static registerRoutes (router: Router, routes: Route[]): void {
    routes.forEach(route => {
      route.register(router)
    })
  }
}
