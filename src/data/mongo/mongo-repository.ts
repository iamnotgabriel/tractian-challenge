import { InternalError } from '@/domain/errors'
import { type Result } from '@/use-case/commons'
import { ObjectId, type WithId , type Collection } from 'mongodb'

export class MongoRepository {
  constructor (protected readonly collection: Collection) {}

  protected map<T>(document: WithId<any>): T {
    const id = document._id.toHexString()
    delete document._id
    document.id = id
    this.mapObjectKeysToString(document)

    return document
  }

  private mapObjectKeysToString<T>(document: T): T {
    for (const key of Object.keys(document)) {
      if (document[key] instanceof ObjectId) {
        const id = document[key].toHexString()
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete document[key]
        document[key] = id
      }
    }
    return document
  }

  protected mapIdsToObjectIds (entity: object): object {
    for (const [key, value] of Object.entries(entity)) {
      if (ObjectId.isValid(value) && key.match(/id/i) && typeof value === 'string') {
        entity[key] = new ObjectId(value)
      }
    }

    return entity
  }

  protected mapAll<T>(documents: Array<WithId<any>>): T[] {
    return documents.map(this.map.bind(this))
  }

  protected noAcknowledgment (): Result.Err<InternalError> {
    return new InternalError(new Error('No acknowledgment received')).toResult()
  }
}
