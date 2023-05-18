import { MongoRepository } from '../mongo/mongo-repository'
import { type PageRequest, type ValueObject } from '@/domain/commons/types'
import { type Result } from '@/use-case/commons'
import { SaveMongoRepository } from '../mongo/repository/save'
import { type Collection } from 'mongodb'
import { FindMongoRepository } from '../mongo/repository/find'
import { type DeleteByIdRepository, type FindByIdRepository, type ListRepository, type UpdateByIdRepository } from '@/use-case/commons/plugins'
import { DeleteMongoRepository } from '../mongo/repository/delete'
import { ListMongoRepository } from '../mongo/repository/list'
import { UpdateMongoRepository } from '../mongo/repository/update'

export class MongoEntityRepository<T extends { id: string }> extends MongoRepository
  implements
        FindByIdRepository<T>,
        DeleteByIdRepository,
        ListRepository<T>,
        UpdateByIdRepository<T>,
        SaveMongoRepository<T> {
  protected readonly saveMongoRepository: SaveMongoRepository<T>
  protected readonly findMongoRepository: FindMongoRepository<T>
  protected readonly deleteMongoRepository: DeleteMongoRepository
  protected readonly listMongoRepository: ListMongoRepository<T>
  protected readonly updateMongoRepository: UpdateMongoRepository<T>

  constructor (collection: Collection) {
    super(collection)
    this.saveMongoRepository = new SaveMongoRepository(this.collection)
    this.findMongoRepository = new FindMongoRepository(this.collection)
    this.deleteMongoRepository = new DeleteMongoRepository(this.collection)
    this.listMongoRepository = new ListMongoRepository(this.collection)
    this.updateMongoRepository = new UpdateMongoRepository(this.collection)
  }

  async save (document: ValueObject<T>): Promise<Result<T>> {
    return this.saveMongoRepository.save(document)
  }

  async find (id: string): Promise<Result<T>> {
    return this.findMongoRepository.find(id)
  }

  async delete (id: string): Promise<Result<void>> {
    return this.deleteMongoRepository.delete(id)
  }

  async list (request: PageRequest): Promise<Result<T[]>> {
    return this.listMongoRepository.list(request)
  }

  async count (filters?: Record<string, any>): Promise<Result<number>> {
    return this.listMongoRepository.count(filters)
  }

  async update (request: UpdateByIdRepository.Request<T>): Promise<Result<void>> {
    return this.updateMongoRepository.update(request)
  }
}
