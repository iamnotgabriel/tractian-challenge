import { TestApplication } from '@/tests/main/test-application'
import { toErr, toOk } from '@/use-case/commons'
import request from 'supertest'
import { type Express } from 'express'
import crypto from 'crypto'
import { InternalError } from '@/domain/errors'

describe('api/user/create', () => {
  let app: Express

  beforeAll(async () => {
    const webApi = await TestApplication.create()
    app = webApi.app
  })

  afterAll(async () => {
    await TestApplication.teardown()
  })

  test('creates user', async () => {
    const body = {
      name: 'API Testing user',
      email: 'tester@company.com',
      companyId: crypto.randomUUID()
    }
    TestApplication.context.createUserUseCase.handle.mockResolvedValueOnce(toOk({
      ...body,
      id: '0as9df80a98f08089',
      createdAt: new Date()
    }))
    const response = await request(app).post('/api/v1/users').send(body).expect(201)
    const { id } = response.body

    const contentLocation = `http://localhost:8080/api/v1/users/${id}`

    expect(response.headers['content-location']).toBe(contentLocation)
    expect(TestApplication.context.createUserUseCase.handle).toBeCalledTimes(1)
  })

  test('create fails and returns error', async () => {
    const user = {
      name: 'API Testing user',
      email: 'tester@company.com',
      companyId: crypto.randomUUID()
    }
    TestApplication.context.createUserUseCase
      .handle.mockResolvedValueOnce(toErr(new InternalError(new Error('testing'))))
    const { body: res } = await request(app).post('/api/v1/users').send(user).expect(500)

    expect(res).toEqual({
      errorCode: 500,
      message: 'Internal Error'
    })
  })
})
