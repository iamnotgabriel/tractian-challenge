import { MongoClientSingleton } from '../mongo/mongo-client'
import { type User } from '@/domain/user/entity'
import { MongoEntityRepository } from '../mongo/mongo-entity-repository'

export class UserMongoRepository extends MongoEntityRepository<User> {
  constructor () {
    super(MongoClientSingleton.getCollection('users'))
  }
}
