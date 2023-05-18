import { TestApplication } from '@/tests/main/test-application'
import request from 'supertest'
import { type Express } from 'express'
import { getContext } from '@/resources/context/application'
import { type CreateUnitDTO } from '@/domain/unit/entity'
import { createCompany } from '../company/requests'

describe('api/unit/create', () => {
  let app: Express

  beforeAll(async () => {
    const webApi = await TestApplication.create(getContext)
    app = webApi.app
  })

  afterAll(async () => {
    await TestApplication.teardown()
  })

  test('create unit', async () => {
    const { id: companyId } = await createCompany(app)
    const body: CreateUnitDTO = {
      name: 'API Testing company',
      companyId
    }
    const { body: res, headers } = await request(app).post('/api/v1/units').send(body).expect(201)

    const contentLocation = `http://localhost:8080/api/v1/units/${res.id}`

    expect(headers['content-location']).toBe(contentLocation)
    expect(res).toMatchObject({
      ...body
    })
  })
})
