import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'
import { type HttpResponse } from '../http/http-response'
import { Route } from '../route'
import { type DeleteUseCase } from '@/use-case/commons/use-case/delete'
import { DeleteRoute } from '../route/delete'

export class DeleteUserRoute extends Route {
  private readonly route: DeleteRoute

  constructor (private readonly useCase: DeleteUseCase) {
    super()
    this.route = new DeleteRoute(useCase)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const id = req.params.userId
    return this.route.handle(id)
  }

  register (router: Router): void {
    router.delete('/users/:userId', this.handler)
  }
}
