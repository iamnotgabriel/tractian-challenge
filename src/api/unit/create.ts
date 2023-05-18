import { type Unit, type CreateUnitDTO } from '@/domain/unit/entity'
import { type Result } from '@/use-case/commons'
import { type CreateUnitUseCase } from '@/use-case/unit/create-unit'
import { type Request, type Router } from 'express'
import { Route } from '@/api/route'
import { configuration } from '@/resources/context/configuration'
import { type HttpResponse } from '../http/http-response'
import { CreateRoute } from '../route/create'

export class CreateUnitRoute extends Route {
  private readonly createRoute: CreateRoute<CreateUnitDTO, Unit>

  constructor (createUserUseCase: CreateUnitUseCase) {
    super()
    this.createRoute = new CreateRoute(
      createUserUseCase,
            `${configuration.serverDomain}/api/v1/units/:id`
    )
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const dto = req.body as CreateUnitDTO
    return this.createRoute.handle(dto)
  }

  public register (router: Router) {
    router.post('/units', this.handler)
  }
}
