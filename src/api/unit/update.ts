import { type Unit } from '@/domain/unit/entity'
import { type UpdateUnitUseCase } from '@/use-case/unit/update-unit'
import { UpdateRoute } from '../route/update'
import { Route } from '../route'
import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'

import { type HttpResponse } from '../http/http-response'

export class UpdateUnitRoute extends Route {
  private readonly route: UpdateRoute<UpdateUnitUseCase.Request, Unit>

  constructor (useCase: UpdateUnitUseCase) {
    super()
    this.route = new UpdateRoute(useCase)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const id = req.params.unitId
    const patch = req.body
    return this.route.handle({ id, patch })
  }

  register (router: Router): void {
    router.patch('/units/:unitId', this.handler)
  }
}
