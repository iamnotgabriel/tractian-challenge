import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'
import { Route } from '@/api/route'
import { type HttpResponse } from '../http/http-response'
import { type Company } from '@/domain/company/entity'
import { type ReadUseCase } from '@/use-case/commons/use-case/read'
import { ReadRoute } from '../route/read'

export class ReadCompanyRoute extends Route {
  private readonly route: ReadRoute<Company>

  constructor (useCase: ReadUseCase<Company>) {
    super()
    this.route = new ReadRoute(useCase)
  }

  register (router: Router): void {
    router.get('/companies/:companyId', this.handler)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const id = req.params.companyId
    return this.route.handle(id)
  }
}
