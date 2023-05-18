import { TestApplication } from '@/tests/main/test-application'
import { toOk } from '@/use-case/commons'
import request from 'supertest'
import { type Express } from 'express'
import { InternalError } from '@/domain/errors'

describe('api/user/delete', () => {
  let app: Express

  beforeAll(async () => {
    const webApi = await TestApplication.create()
    app = webApi.app
  })

  afterAll(async () => {
    await TestApplication.teardown()
  })

  test('delete user route', async () => {
    const user = {
      id: '0as9df80a98f08089',
      name: 'API Testing company',
      document: '09876543210',
      createdAt: new Date()
    }

    TestApplication.context.deleteUserUseCase.handle.mockResolvedValueOnce(toOk(null))
    await request(app).delete('/api/v1/users/' + user.id).send().expect(204)
  })

  test('delete user route', async () => {
    const user = {
      id: '0as9df80a98f08089',
      name: 'API Testing worker',
      email: 'tester@api.com',
      createdAt: new Date()
    }

    TestApplication.context.deleteUserUseCase
      .handle.mockResolvedValueOnce(new InternalError(new Error('another one')).toResult())
    const { body: res } = await request(app).delete('/api/v1/users/' + user.id).send().expect(500)

    expect(res).toEqual({
      errorCode: 500,
      message: 'Internal Error'
    })
  })
})
