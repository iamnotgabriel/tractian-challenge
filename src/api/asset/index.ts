import { type ApplicationContext } from '@/resources/context/application'
import { type Router } from 'express'
import { Route } from '../route'
import { CreateAssetRoute } from './create'
import { ReadAssetRoute } from './read'
import { ListAssetRoute } from './list'
import { DeleteAssetRoute } from './delete'
import { UpdateAssetRoute } from './update'

export function registerRoutes (router: Router, context: ApplicationContext) {
  Route.registerRoutes(router, [
    new CreateAssetRoute(context.createAssetUseCase),
    new ReadAssetRoute(context.readAssetUseCase),
    new UpdateAssetRoute(context.updateAssetUseCase),
    new DeleteAssetRoute(context.deleteAssetUseCase),
    new ListAssetRoute(context.listAssetUseCase)
  ])
}
