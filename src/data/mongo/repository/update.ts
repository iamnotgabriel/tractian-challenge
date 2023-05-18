import { toOk } from '@/use-case/commons'
import { type UpdateByIdRepository } from '@/use-case/commons/plugins'
import { MongoRepository } from '../mongo-repository'
import { NotFoundError } from '@/domain/errors'
import { ObjectId } from 'mongodb'

export class UpdateMongoRepository<T> extends MongoRepository implements UpdateByIdRepository<UpdateByIdRepository.Request<T>> {
  async update ({ id, patch }: UpdateByIdRepository.Request<T>): Promise<UpdateByIdRepository.Response> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: this.mapIdsToObjectIds(patch) },
      { upsert: false }
    )
    if (result.acknowledged && result.modifiedCount > 0) {
      return toOk(null)
    }
    if (result.acknowledged && result.matchedCount === 0) {
      return new NotFoundError(this.collection.namespace, { id }).toResult()
    }

    return this.noAcknowledgment()
  }
}
