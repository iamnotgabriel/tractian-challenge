import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'
import { Route } from '@/api/route'
import { type HttpResponse } from '../http/http-response'
import { type ListUseCase } from '@/use-case/commons/use-case/list'
import { type User } from '@/domain/user/entity'
import { ListRoute } from '../route/list'
import { PageRequest } from '@/domain/commons/types'

export class ListUserRoute extends Route {
  private readonly route: ListRoute<User>

  constructor (useCase: ListUseCase<User>) {
    super()
    this.route = new ListRoute(useCase)
  }

  register (router: Router): void {
    router.get('/users', this.handler)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    return this.route.handle(PageRequest.from(req.query))
  }
}
