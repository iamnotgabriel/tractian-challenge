import { TestApplication } from '@/tests/main/test-application'
import { type Express } from 'express'
import { getContext } from '@/resources/context/application'
import { MongoClientSingleton } from '@/data/mongo/mongo-client'
import { createAsset } from './requests'
import request from 'supertest'

describe('api/asset/read', () => {
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
    await MongoClientSingleton.getCollection('assets').deleteMany({})
    await MongoClientSingleton.getCollection('users').deleteMany({})
  })

  test('read asset', async () => {
    const asset = await createAsset(app, { name: 'This asset is funny' })
    const { body } = await request(app).get('/api/v1/assets/' + asset.id).expect(200)

    expect(body).toMatchObject(asset)
  })
})
