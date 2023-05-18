import { MongoClientSingleton } from '@/data/mongo/mongo-client'
import { WebAPI } from '@/api/web-api'
import { type ApplicationContext } from '../resources/context/application'

export class Application {
  private readonly server: WebAPI

  constructor (context: ApplicationContext) {
    this.server = new WebAPI(context)
  }

  async start (): Promise<void> {
    this.setup()
    await this.server.start()
  }

  private setup (): void {
    this.server.setup()
  }

  async teardown (): Promise<void> {
    await MongoClientSingleton.disconnect()
  }
}
