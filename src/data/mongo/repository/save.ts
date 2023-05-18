import { type Result, toOk } from '@/use-case/commons'
import { type SaveRepository } from '@/use-case/commons/plugins'
import { MongoRepository } from '../mongo-repository'

export class SaveMongoRepository<R extends { id: string }> extends MongoRepository implements SaveRepository<any, R> {
  async save (document: any): Promise<Result<R>> {
    const result = await this.collection.insertOne(this.mapIdsToObjectIds(document))
    if (result.acknowledged) {
      return toOk(this.map(document))
    }

    return this.noAcknowledgment()
  }
}
