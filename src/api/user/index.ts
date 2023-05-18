import { type ApplicationContext } from '@/resources/context/application'
import { type Router } from 'express'
import { Route } from '../route'
import { CreateUserRoute } from './create'
import { ReadUserRoute } from './read'
import { DeleteUserRoute } from './delete'
import { ListUserRoute } from './list'
import { UpdateUserRoute } from './update'

export function registerRoutes (router: Router, context: ApplicationContext): void {
  Route.registerRoutes(router, [
    new CreateUserRoute(context.createUserUseCase),
    new ReadUserRoute(context.readUserUseCase),
    new DeleteUserRoute(context.deleteUserUseCase),
    new ListUserRoute(context.listUserUseCase),
    new UpdateUserRoute(context.updateUserUseCase)
  ])
}
