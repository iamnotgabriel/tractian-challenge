import { TestApplication } from '@/tests/main/test-application'
import request from 'supertest'
import { type Express } from 'express'
import { getContext } from '@/resources/context/application'
import { type CreateUnitDTO } from '@/domain/unit/entity'
import { createCompany } from '../company/requests'
import { createUnit, readUnit } from './requests'

describe('api/unit/update', () => {
  let app: Express

  beforeAll(async () => {
    const webApi = await TestApplication.create(getContext)
    app = webApi.app
  })

  afterAll(async () => {
    await TestApplication.teardown()
  })

  test('update unit', async () => {
    const { id: companyId } = await createCompany(app)
    const body: CreateUnitDTO = {
      name: 'API Testing Company',
      companyId
    }
    const { id } = await createUnit(app, body)
    await request(app).patch(`/api/v1/units/${id}`).send({ name: 'Fullstack Testing Company' }).expect(200)
    const unit = await readUnit(app, id, 200)

    expect(unit.name).toEqual('Fullstack Testing Company')
  })
})
