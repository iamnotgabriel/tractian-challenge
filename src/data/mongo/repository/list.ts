import { type Result, toOk } from '@/use-case/commons'
import { type ListRepository } from '@/use-case/commons/plugins'
import { MongoRepository } from '../mongo-repository'
import { type PageRequest } from '@/domain/commons/types'
import { ObjectId } from 'mongodb'

function isEmpty (obj: object): boolean {
  return obj != null && Object.keys(obj).length == 0
}

function transform (doc: object): object {
  const filter = {}
  for (let [key, value] of Object.entries(doc)) {
    if (key === 'id') {
      key = '_id'
    }
    if (ObjectId.isValid(value)) {
      filter[key] = new ObjectId(value)
    } else {
      filter[key] = value
    }
  }
  return filter
}

export class ListMongoRepository<T> extends MongoRepository implements ListRepository<T> {
  async list (request: PageRequest): Promise<Result<T[]>> {
    const pipeline: object[] = [
      { $sort: { [request.sort]: 1 } },
      { $skip: request.skip },
      { $limit: request.limit }
    ]
    if (request.filters != null && !isEmpty(request.filters)) {
      pipeline.unshift({ $match: transform(request.filters) })
    }

    const documents = await this.collection.aggregate(pipeline).toArray()

    return toOk(this.mapAll(documents))
  }

  async count (filters?: Record<string, any>): Promise<Result<number>> {
    if (filters != null && !isEmpty(filters)) {
      return toOk(await this.collection.countDocuments(transform(filters)))
    }
    return toOk(await this.collection.countDocuments())
  }
}
