import { companyRepository } from './stubs'
import { expectToBeOk } from '@/tests/result'
import { type Result, toOk } from '@/use-case/commons'
import { ErrorCodes, InternalError } from '@/domain/errors'
import { ReadUseCaseImpl } from '@/use-case/commons/use-case/read'
import { type Company } from '@/domain/company/entity'
import crypto from 'crypto'

describe('use-case/read-company', () => {
  function useCase (): ReadUseCaseImpl<Company> {
    return new ReadUseCaseImpl('Company', companyRepository)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('finds company', async () => {
    companyRepository.find.mockImplementationOnce(async (id) => (toOk({
      id,
      name: 'Big Tech Company',
      document: '94919521000190',
      createdAt: new Date()
    })))

    const result = await useCase().handle(crypto.randomUUID())
    const entity = expectToBeOk(result)
    expect(entity).toHaveProperty('id')
  })

  test('fails when a error occurs', async () => {
    companyRepository.find.mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())

    const result = await useCase().handle(crypto.randomUUID()) as Result.Err
    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR)
  })

  test('returns value null when company is not found ', async () => {
    companyRepository.find.mockResolvedValueOnce(toOk(null))

    const result = await useCase().handle(crypto.randomUUID()) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(404)
  })
})
