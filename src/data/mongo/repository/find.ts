import { type Result, toOk } from '@/use-case/commons'
import { type FindByIdRepository, SaveRepository } from '@/use-case/commons/plugins'
import { MongoRepository } from '../mongo-repository'
import { ObjectId } from 'mongodb'

export class FindMongoRepository<T> extends MongoRepository implements FindByIdRepository<T> {
  async find (id: string): Promise<Result<T>> {
    const company = await this.collection.findOne({ _id: new ObjectId(id) })
    if (company == null) {
      return toOk(null)
    }
    return toOk(this.map(company))
  }
}
