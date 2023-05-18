import { type Company } from '@/domain/company/entity'
import { MongoClientSingleton } from '../mongo/mongo-client'
import { type SaveMongoRepository } from '../mongo/repository/save'
import { MongoEntityRepository } from '../mongo/mongo-entity-repository'

export class CompanyMongoRepository extends MongoEntityRepository<Company> {
  protected readonly saveRepository: SaveMongoRepository<Company>

  constructor () {
    super(MongoClientSingleton.getCollection('companies'))
  }
}
