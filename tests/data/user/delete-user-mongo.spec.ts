import { UserMongoRepository } from '@/data/user/repository'
import { MongoClientSingleton } from '@/data/mongo/mongo-client'
import { type ValueObject } from '@/domain/commons/types'
import { expectToBeOk } from '../../result'
import { type User } from '@/domain/user/entity'

describe('data/user/user-mongo-repository', () => {
  beforeAll(async () => {
    await MongoClientSingleton.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoClientSingleton.disconnect()
  })

  afterEach(async () => {
    await MongoClientSingleton.getCollection('companies').deleteMany()
  })

  test('deletes saved user by id', async () => {
    const repository = new UserMongoRepository()
    const user: ValueObject<User> = {
      name: 'Testing guy',
      email: 'me@test.com',
      companyId: '64628225f5b6a1023af42e91',
      createdAt: new Date()
    }
    const { id } = expectToBeOk(await repository.save(user))
    expectToBeOk(await repository.delete(id))
    const result = await repository.find(id)

    expect(result).toMatchObject({
      ok: true,
      value: null
    })
  })

  test('deletes user not saved', async () => {
    const repository = new UserMongoRepository()
    const result = await repository.delete('64628225f5b6a1023af42e91')

    expect(result).toMatchObject({
      ok: true,
      value: null
    })
  })
})
