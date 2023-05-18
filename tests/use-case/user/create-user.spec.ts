import { userRepository } from './stubs'
import { expectToBeOk } from '../../result'
import { toOk } from '@/use-case/commons'
import { CreateUserUseCaseImpl } from '@/use-case/user/create-user'
import crypto from 'crypto'
import { getTestContext } from '@/tests/main/context'
import { NotFoundError } from '@/domain/errors'

describe('use-case/create-user', () => {
  const testContext = getTestContext()

  function useCase (): CreateUserUseCaseImpl {
    return new CreateUserUseCaseImpl(testContext.readCompanyUseCase, userRepository)
  }

  const userDTO = {
    name: 'Test user',
    email: 'user@email.com',
    companyId: crypto.randomUUID()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creates new user', async () => {
    userRepository.save.mockImplementation(async (user) => (toOk({
      ...user,
      id: crypto.randomUUID()
    })))
    testContext.readCompanyUseCase.handle.mockResolvedValueOnce(toOk(null))

    const result = await useCase().handle(userDTO)
    const entity = expectToBeOk(result)

    expect(entity).toHaveProperty('id')
    expect(testContext.readCompanyUseCase.handle).toBeCalledTimes(1)
    expect(userRepository.save).toBeCalledTimes(1)
  })

  test('fails to create user when company does no exist', async () => {
    userRepository.save.mockImplementation(async (user) => (toOk({
      ...user,
      id: crypto.randomUUID()
    })))
    testContext.readCompanyUseCase.handle
      .mockResolvedValueOnce(new NotFoundError('Company', { id: userDTO.companyId }).toResult())

    const result = await useCase().handle(userDTO)

    expect(result.ok).toBeFalsy()
    expect(testContext.readCompanyUseCase.handle).toBeCalledTimes(1)
    expect(userRepository.save).toBeCalledTimes(0)
  })

  test('fails to create user when dto is invalid', async () => {
    const result = await useCase().handle({
      ...userDTO,
      email: 'please enter a valid email here'
    })

    expect(result.ok).toBeFalsy()
    expect(testContext.readCompanyUseCase.handle).toBeCalledTimes(0)
    expect(userRepository.save).toBeCalledTimes(0)
  })
})
