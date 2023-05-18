import { TestApplication } from '@/tests/main/test-application'
import { toOk } from '@/use-case/commons'
import request from 'supertest'
import { type Express } from 'express'

describe('api/company/update', () => {
  let app: Express

  beforeAll(async () => {
    const webApi = await TestApplication.create()
    app = webApi.app
  })

  afterAll(async () => {
    await TestApplication.teardown()
  })

  test('update company route', async () => {
    const company = {
      id: '0as9df80a98f08089',
      name: 'API Testing company',
      document: '09876543210',
      createdAt: new Date()
    }
    const patch = {
      name: 'updated name'
    }
    TestApplication.context.updateCompanyUseCase.handle.mockResolvedValueOnce(toOk({ ...company, ...patch }))
    await request(app).patch('/api/v1/companies/' + company.id).send(patch).expect(200)
  })
})
