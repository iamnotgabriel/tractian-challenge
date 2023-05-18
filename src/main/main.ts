import 'module-alias/register'
import { MongoClientSingleton } from '@/data/mongo/mongo-client'
import { configuration } from '../resources/context/configuration'
import { Application } from './application'
import { getContext } from '../resources/context/application'

async function main (): Promise<void> {
  await MongoClientSingleton.connect(configuration.mongoUrl)
  const app = new Application(getContext())
  try {
    await app.start()
  } catch {
    await app.teardown()
  }
}

void main()
