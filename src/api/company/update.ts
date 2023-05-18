import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'
import { Route } from '@/api/route'
import { type UpdateCompanyUseCase } from '@/use-case/company/update-company'
import { type UpdateObject } from '@/domain/commons/types'
import { type Company } from '@/domain/company/entity'
import { type HttpResponse } from '../http/http-response'
import { UpdateRoute } from '../route/update'

export class UpdateCompanyRoute extends Route {
  private readonly route: UpdateRoute<UpdateCompanyUseCase.Request, Company>

  constructor (useCase: UpdateCompanyUseCase) {
    super()
    this.route = new UpdateRoute(useCase)
  }

  register (router: Router): void {
    router.patch('/companies/:companyId', this.handler)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const id = req.params.companyId
    const patch = req.body as UpdateObject<Company>
    return this.route.handle({ id, patch })
  }
}
