import { type User } from '@/domain/user/entity'
import { type UpdateUserUseCase } from '@/use-case/user/update-user'
import { UpdateRoute } from '../route/update'
import { Route } from '../route'
import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'

import { type HttpResponse } from '../http/http-response'

export class UpdateUserRoute extends Route {
  private readonly route: UpdateRoute<UpdateUserUseCase.Request, User>

  constructor (useCase: UpdateUserUseCase) {
    super()
    this.route = new UpdateRoute(useCase)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const id = req.params.userId
    const patch = req.body
    return this.route.handle({ id, patch })
  }

  register (router: Router): void {
    router.patch('/users/:userId', this.handler)
  }
}
