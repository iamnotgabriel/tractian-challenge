import { type Asset } from '@/domain/asset/entity'
import { type UpdateAssetUseCase } from '@/use-case/asset/update-asset'
import { UpdateRoute } from '../route/update'
import { Route } from '../route'
import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'

import { type HttpResponse } from '../http/http-response'

export class UpdateAssetRoute extends Route {
  private readonly route: UpdateRoute<UpdateAssetUseCase.Request, Asset>

  constructor (useCase: UpdateAssetUseCase) {
    super()
    this.route = new UpdateRoute(useCase)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const id = req.params.assetId
    const patch = req.body
    return this.route.handle({ id, patch })
  }

  register (router: Router): void {
    router.patch('/assets/:assetId', this.handler)
  }
}
