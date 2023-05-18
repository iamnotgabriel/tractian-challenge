import { CompanyMongoRepository } from '@/data/company/repository'
import { MongoClientSingleton } from '@/data/mongo/mongo-client'
import { type ValueObject } from '@/domain/commons/types'
import { type Company } from '@/domain/company/entity'
import { expectToBeOk } from '../../result'

describe('data/company/company-mongo-repository', () => {
  beforeAll(async () => {
    await MongoClientSingleton.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoClientSingleton.disconnect()
  })

  afterEach(async () => {
    await MongoClientSingleton.getCollection('companies').deleteMany()
  })

  test('delete company by id', async () => {
    const repository = new CompanyMongoRepository()
    const company: ValueObject<Company> = {
      name: 'Testing company',
      document: '01234567890',
      createdAt: new Date()
    }
    const { id } = expectToBeOk(await repository.save(company))
    expectToBeOk(await repository.delete(id))
    const entity = expectToBeOk(await repository.find(id))

    expect(entity).toBeNull()
  })

  test('delete company that does not exist does not lead to error', async () => {
    const repository = new CompanyMongoRepository()

    expectToBeOk(await repository.delete('64628225f5b6a1023af42e91'))
  })
})
