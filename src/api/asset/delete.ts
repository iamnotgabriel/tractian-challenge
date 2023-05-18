import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'
import { Route } from '@/api/route'
import { type HttpResponse } from '../http/http-response'
import { type DeleteUseCase } from '@/use-case/commons/use-case/delete'
import { DeleteRoute } from '../route/delete'

export class DeleteAssetRoute extends Route {
  private readonly route: DeleteRoute

  constructor (useCase: DeleteUseCase) {
    super()
    this.route = new DeleteRoute(useCase)
  }

  register (router: Router) {
    router.delete('/assets/:assetId', this.handler)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const id = req.params.assetId
    return this.route.handle(id)
  }
}
