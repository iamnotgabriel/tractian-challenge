import { unitRepository } from './stubs'
import { expectToBeOk } from '@/tests/result'
import { type Result, toOk } from '@/use-case/commons'
import { ErrorCodes, InternalError, NotFoundError } from '@/domain/errors'
import { UpdateUnitUseCaseImpl } from '@/use-case/unit/update-unit'
import { getTestContext } from '@/tests/main/context'
import { type Unit } from '@/domain/unit/entity'

describe('use-case/update-unit', () => {
  const unit: Unit = {
    id: '64628225f5b6a1023af42e91',
    name: 'Big Tech Engineer',
    companyId: '64628225f5b6a1023af42e91',
    createdAt: new Date()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  function useCase () {
    return new UpdateUnitUseCaseImpl(unitRepository)
  }

  test('update unit', async () => {
    unitRepository.update.mockImplementationOnce(async (_) => (toOk(null)))
    unitRepository.find.mockImplementationOnce(async (_) => (toOk(unit)))

    const request = {
      id: unit.id,
      patch: {
        name: 'Proud Woodworker'
      }
    }
    const result = await useCase().handle(request)
    const entity = expectToBeOk(result)
    expect(entity.id).toBe(request.id)
    expect(entity).toMatchObject(request.patch)
  })

  test('fails when unit is not found', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        name: 'new unit'
      }
    }
    unitRepository.find
      .mockImplementationOnce(async (_) =>
        new NotFoundError('Unit', { id: unit.id }).toResult()
      )

    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.NOT_FOUND)
    expect(unitRepository.update).not.toBeCalled()
  })

  test('fails when patch is invalid', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        name: ''
      }
    }
    unitRepository.find.mockImplementationOnce(async (_) => (toOk(unit)))
    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.VALIDATION_ERROR)
    expect(unitRepository.update).not.toBeCalled()
  })

  test('fails when a error occurs', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        name: 'Small town company'
      }
    }
    unitRepository.find.mockImplementationOnce(async (_) => (toOk(unit)))

    unitRepository.update.mockResolvedValueOnce(new InternalError(new Error('message')).toResult())

    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(500)
  })
})
