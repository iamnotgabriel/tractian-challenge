import { TestApplication } from '@/tests/main/test-application'
import request from 'supertest'
import { type Express } from 'express'
import { getContext } from '@/resources/context/application'
import { type CreateUnitDTO } from '@/domain/unit/entity'
import { createCompany } from '../company/requests'
import { createUnit, readUnit } from './requests'

describe('api/unit/delete', () => {
  let app: Express

  beforeAll(async () => {
    const webApi = await TestApplication.create(getContext)
    app = webApi.app
  })

  afterAll(async () => {
    await TestApplication.teardown()
  })

  test('delete unit', async () => {
    const { id: companyId } = await createCompany(app)
    const body: CreateUnitDTO = {
      name: 'API Testing company',
      companyId
    }
    const { id } = await createUnit(app, body)
    await request(app).delete(`/api/v1/units/${id}`).send().expect(204)
    await readUnit(app, id, 404)
  })
})
