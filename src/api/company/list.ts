import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'
import { Route } from '@/api/route'
import { type HttpResponse } from '../http/http-response'
import { type ListUseCase } from '@/use-case/commons/use-case/list'
import { type Company } from '@/domain/company/entity'
import { ListRoute } from '../route/list'
import { PageRequest } from '@/domain/commons/types'

export class ListCompanyRoute extends Route {
  private readonly route: ListRoute<Company>

  constructor (useCase: ListUseCase<Company>) {
    super()
    this.route = new ListRoute(useCase)
  }

  register (router: Router): void {
    router.get('/companies', this.handler)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    return this.route.handle(PageRequest.from(req.query))
  }
}
