import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'
import { type HttpResponse } from '../http/http-response'
import { Route } from '../route'
import { type CreateUserUseCase } from '@/use-case/user/create-user'
import { configuration } from '@/resources/context/configuration'
import { CreateRoute } from '../route/create'
import { type CreateUserDTO, type User } from '@/domain/user/entity'

export class CreateUserRoute extends Route {
  private readonly createRoute: CreateRoute<CreateUserDTO, User>

  constructor (createUserUseCase: CreateUserUseCase) {
    super()
    this.createRoute = new CreateRoute(
      createUserUseCase,
            `${configuration.serverDomain}/api/v1/users/:id`
    )
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const dto = req.body as CreateUserDTO
    return this.createRoute.handle(dto)
  }

  register (router: Router): void {
    router.post('/users', this.handler)
  }
}
