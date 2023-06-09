import { companyRepository } from './stubs'
import { expectToBeOk } from '@/tests/result'
import { type Result, toOk } from '@/use-case/commons'
import { ErrorCodes, InternalError } from '@/domain/errors'
import { PageRequest } from '@/domain/commons/types'
import { ListUseCaseImpl } from '@/use-case/commons/use-case/list'
import { type Company } from '@/domain/company/entity'

import crypto from 'crypto'

describe('use-case/list-company', () => {
  function useCase (): ListUseCaseImpl<Company> {
    return new ListUseCaseImpl(companyRepository)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('lists companies', async () => {
    const company = {
      id: crypto.randomUUID(),
      name: 'Big Tech Company',
      document: '94919521000190',
      createdAt: new Date()
    }
    companyRepository.list.mockImplementationOnce(async ({ limit }) => (toOk(Array(limit).fill(company))))
    companyRepository.count.mockResolvedValueOnce(toOk(100))
    const request = expectToBeOk(PageRequest.from({ limit: 10, skip: 0 }))
    const result = await useCase().handle(request)
    const companies = expectToBeOk(result)

    expect(companies.data).toHaveLength(10)
    expect(companyRepository.list).toBeCalledWith({ limit: 10, skip: 0, sort: 'id', filters: {} })
    expect(companies.total).toBe(100)
  })

  test('fails when a error occurs on count', async () => {
    companyRepository.list.mockResolvedValueOnce(toOk([]))
    companyRepository.count.mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())

    const request = expectToBeOk(PageRequest.from({ limit: 10, skip: 0 }))
    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR)
  })

  test('fails when a error occurs on list', async () => {
    companyRepository.list.mockResolvedValueOnce(new InternalError(new Error('Bad Entry')).toResult())
    companyRepository.count.mockResolvedValueOnce(toOk(0))

    const request = expectToBeOk(PageRequest.from({ limit: 10, skip: 0 }))
    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.INTERNAL_ERROR)
  })
})
