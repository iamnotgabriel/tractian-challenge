import { TestApplication } from '@/tests/main/test-application'
import request from 'supertest'
import { type Express } from 'express'
import { getContext } from '@/resources/context/application'
import { createCompany } from '../company/requests'
import { createUnit } from './requests'

describe('api/unit/read', () => {
  let app: Express

  beforeAll(async () => {
    const webApi = await TestApplication.create(getContext)
    app = webApi.app
  })

  afterAll(async () => {
    await TestApplication.teardown()
  })

  test('read unit by', async () => {
    const { id: companyId } = await createCompany(app)
    const unit = await createUnit(app, {
      name: 'The Unit',
      companyId
    })

    const { body: res } = await request(app).get(`/api/v1/units/${unit.id}`).expect(200)

    expect(res).toMatchObject(unit)
  })
})
