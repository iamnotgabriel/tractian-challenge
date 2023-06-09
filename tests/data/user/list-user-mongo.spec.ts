import { UserMongoRepository } from '@/data/user/repository'
import { MongoClientSingleton } from '@/data/mongo/mongo-client'
import { PageRequest, type ValueObject } from '@/domain/commons/types'
import { expectToBeOk } from '../../result'
import { type User } from '@/domain/user/entity'

describe('data/user/user-mongo-repository', () => {
  beforeAll(async () => {
    await MongoClientSingleton.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoClientSingleton.disconnect()
  })

  beforeEach(async () => {
    await MongoClientSingleton.getCollection('users').deleteMany()
  })

  test('list saved users by id', async () => {
    const repository = new UserMongoRepository()
    const user: (name: string) => ValueObject<User> = (name) => ({
      name,
      email: 'email@domain.com',
      companyId: '64628225f5b6a1023af42e91',
      createdAt: new Date()
    })

    expectToBeOk(await repository.save(user('3')))
    expectToBeOk(await repository.save(user('2')))
    const { id: firstId } = expectToBeOk(await repository.save(user('1')))

    const entities = expectToBeOk(await repository.list(new PageRequest(1, 0, 'name')))
    const total = expectToBeOk(await repository.count())

    expect(entities).toHaveLength(1)
    expect(entities[0].id).toEqual(firstId)
    expect(total).toEqual(3)
  })

  test('returns empty list when collection is empty', async () => {
    const repository = new UserMongoRepository()
    const entities = expectToBeOk(await repository.list(new PageRequest(10, 10, 'id')))
    const total = expectToBeOk(await repository.count())

    expect(entities).toHaveLength(0)
    expect(total).toEqual(0)
  })
})
