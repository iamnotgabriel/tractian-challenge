import { MongoClientSingleton } from '@/data/mongo/mongo-client'
import { WebAPI } from '@/api/web-api'
import { type ApplicationContext } from '../resources/context/application'

export class Application {
  private readonly server: WebAPI

  constructor (context: ApplicationContext) {
    this.server = new WebAPI(context)
  }

  async start () {
    this.setup()
    this.server.start()
  }

  private setup () {
    this.server.setup()
  }

  async teardown () {
    await MongoClientSingleton.disconnect()
  }
}
