import { MongoClientSingleton } from '../mongo/mongo-client'
import { type Unit } from '@/domain/unit/entity'
import { MongoEntityRepository } from '../mongo/mongo-entity-repository'

export class UnitMongoRepository extends MongoEntityRepository<Unit> {
  constructor () {
    super(MongoClientSingleton.getCollection('units'))
  }
}
