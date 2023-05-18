import { TestApplication } from '@/tests/main/test-application'
import request from 'supertest'
import { type Express } from 'express'
import { getContext } from '@/resources/context/application'
import { createCompany } from '../company/requests'
import { createUnit } from './requests'
import { MongoClientSingleton } from '@/data/mongo/mongo-client'

describe('api/unit/list', () => {
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
  })

  test('list units', async () => {
    const { id: companyId } = await createCompany(app)
    await createUnit(app, {
      name: 'The Unit 1',
      companyId
    })

    await createUnit(app, {
      name: 'The Unit 2',
      companyId
    })

    const unitThree = await createUnit(app, {
      name: 'The Unit 3',
      companyId
    })

    const { body: res } = await request(app)
      .get('/api/v1/units')
      .query('limit=1')
      .query('skip=2')
      .query('sort=createdAt')
      .expect(200)

    expect(res.data).toHaveLength(1)
    expect(res.total).toEqual(3)
    expect(res.data[0]).toMatchObject(unitThree)
  })

  test('list units from different companies', async () => {
    const { id: companyOneId } = await createCompany(app)
    const { id: companyTwoId } = await createCompany(app)
    const unitOne = await createUnit(app, {
      name: 'The Unit 1',
      companyId: companyOneId
    })

    const unitTwo = await createUnit(app, {
      name: 'The Unit 2',
      companyId: companyTwoId
    })
    const { body: resOne } = await request(app)
      .get('/api/v1/units')
      .query('companyId=' + companyOneId)
      .expect(200)

    expect(resOne.data).toHaveLength(1)
    expect(resOne.total).toEqual(1)
    expect(resOne.data[0]).toMatchObject(unitOne)

    const { body: resTwo } = await request(app)
      .get('/api/v1/units')
      .query('companyId=' + companyTwoId)
      .expect(200)

    expect(resTwo.data).toHaveLength(1)
    expect(resTwo.total).toEqual(1)
    expect(resTwo.data[0]).toMatchObject(unitTwo)
  })
})
