import { TestApplication } from '@/tests/main/test-application'
import { type Express } from 'express'
import { getContext } from '@/resources/context/application'
import { createCompany } from '../company/requests'
import { MongoClientSingleton } from '@/data/mongo/mongo-client'
import { createUnit } from '../unit/requests'
import { createUser } from '../user/requests'
import request from 'supertest'

describe('api/asset/create', () => {
  let app: Express

  beforeAll(async () => {
    const webApi = await TestApplication.create(getContext)
    app = webApi.app
  })

  afterAll(async () => {
    await TestApplication.teardown()
  })

  beforeEach(async () => {
    await MongoClientSingleton.getCollection('units').deleteMany({})
    await MongoClientSingleton.getCollection('companies').deleteMany({})
    await MongoClientSingleton.getCollection('users').deleteMany({})
    await MongoClientSingleton.getCollection('assets').deleteMany({})
  })

  test('create asset', async () => {
    const { id: companyId } = await createCompany(app)
    const { id: assigneeId } = await createUser(app, {
      name: 'Emerson',
      email: 'emerson@supremosfreios.com',
      companyId
    })
    const { id: unitId } = await createUnit(app, {
      name: 'API Testing company',
      companyId
    })
    const asset = {
      image: 'http://image.com/path/to/image.webp',
      name: 'Powerful Motor',
      description: 'A good motor',
      model: 'fiat uno',
      assigneeId,
      status: 'Running',
      healthLevel: 50,
      unitId
    }
    const { body: res, headers } = await request(app).post('/api/v1/assets').send(asset).expect(201)

    const contentLocation = `http://localhost:8080/api/v1/assets/${res.id}`

    expect(headers['content-location']).toBe(contentLocation)
    expect(res).toMatchObject({
      ...asset
    })
  })
})
