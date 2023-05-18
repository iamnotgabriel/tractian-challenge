import { userRepository } from './stubs'
import { expectToBeOk } from '@/tests/result'
import { type Result, toOk } from '@/use-case/commons'
import { ErrorCodes, InternalError, NotFoundError } from '@/domain/errors'
import { UpdateUserUseCaseImpl } from '@/use-case/user/update-user'
import { type User } from '@/domain/user/entity'

describe('use-case/update-user', () => {
  const user: User = {
    id: '64628225f5b6a1023af42e91',
    name: 'Big Tech Engineer',
    email: 'clever@guy.com',
    companyId: '64628225f5b6a1023af42e91',
    createdAt: new Date()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  function useCase (): UpdateUserUseCaseImpl {
    return new UpdateUserUseCaseImpl(userRepository)
  }

  test('update user', async () => {
    userRepository.update.mockImplementationOnce(async (_) => (toOk(null)))
    userRepository.find.mockImplementationOnce(async (_) => (toOk(user)))

    const request = {
      id: user.id,
      patch: {
        name: 'Proud Woodworker'
      }
    }
    const result = await useCase().handle(request)
    const entity = expectToBeOk(result)
    expect(entity.id).toBe(request.id)
    expect(entity).toMatchObject(request.patch)
  })

  test('fails when user is not found', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        email: 'email@valid.com'
      }
    }
    userRepository.find
      .mockImplementationOnce(async (_) =>
        new NotFoundError('User', { id: user.id }).toResult()
      )

    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.NOT_FOUND)
    expect(userRepository.update).not.toBeCalled()
  })

  test('fails when patch is invalid', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        name: ''
      }
    }
    userRepository.find.mockImplementationOnce(async (_) => (toOk(user)))
    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.VALIDATION_ERROR)
    expect(userRepository.update).not.toBeCalled()
  })

  test('fails when a error occurs', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        name: 'Small town company'
      }
    }
    userRepository.find.mockImplementationOnce(async (_) => (toOk(user)))

    userRepository.update.mockResolvedValueOnce(new InternalError(new Error('message')).toResult())

    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(500)
  })
})
