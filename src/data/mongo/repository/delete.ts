import { type Result, toOk } from '@/use-case/commons'
import { type DeleteByIdRepository } from '@/use-case/commons/plugins'
import { MongoRepository } from '../mongo-repository'
import { ObjectId } from 'mongodb'

export class DeleteMongoRepository extends MongoRepository implements DeleteByIdRepository {
  async delete (id: string): Promise<Result<void>> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) })
    if (result.acknowledged) {
      return toOk(null)
    }

    return this.noAcknowledgment()
  }
}
