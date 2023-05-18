import { type Result } from '@/use-case/commons'
import { type Request, type Router } from 'express'
import { Route } from '@/api/route'
import { type HttpResponse } from '../http/http-response'
import { type Asset } from '@/domain/asset/entity'
import { type ReadUseCase } from '@/use-case/commons/use-case/read'
import { ReadRoute } from '../route/read'

export class ReadAssetRoute extends Route {
  private readonly route: ReadRoute<Asset>

  constructor (useCase: ReadUseCase<Asset>) {
    super()
    this.route = new ReadRoute(useCase)
  }

  register (router: Router) {
    router.get('/assets/:assetId', this.handler)
  }

  async handle (req: Request): Promise<Result<HttpResponse>> {
    const id = req.params.assetId
    return this.route.handle(id)
  }
}
