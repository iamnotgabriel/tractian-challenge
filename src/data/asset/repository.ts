import { type Asset } from '@/domain/asset/entity'
import { MongoEntityRepository } from '../mongo/mongo-entity-repository'
import { MongoClientSingleton } from '../mongo/mongo-client'

export class AssetMongoRepository extends MongoEntityRepository<Asset> {
  constructor () {
    super(MongoClientSingleton.getCollection('assets'))
  }
}
