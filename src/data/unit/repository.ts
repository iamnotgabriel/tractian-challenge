import { MongoClientSingleton } from '../mongo/mongo-client'
import { type Unit } from '@/domain/unit/entity'

import { MongoEntityRepository } from '../mongo/mongo-entity-repository'
import { ValueObject } from '@/domain/commons/types'
import { Result } from '@/use-case/commons'
import { ObjectId } from 'mongodb'

export class UnitMongoRepository extends MongoEntityRepository<Unit> {
  constructor () {
    super(MongoClientSingleton.getCollection('units'))
  }
}
