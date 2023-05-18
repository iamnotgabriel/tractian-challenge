import { asset, assetRepository } from './stubs'
import { expectToBeOk } from '@/tests/result'
import { type Result, toOk } from '@/use-case/commons'
import { ErrorCodes, InternalError, NotFoundError } from '@/domain/errors'
import { UpdateAssetUseCaseImpl } from '@/use-case/asset/update-asset'
import { getTestContext } from '@/tests/main/context'
import { unit } from '../unit/stubs'
import { user } from '../user/stubs'

describe('use-case/update-asset', () => {
  const { readUnitUseCase, readUserUseCase } = getTestContext()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  function useCase (): UpdateAssetUseCaseImpl {
    return new UpdateAssetUseCaseImpl(assetRepository, readUnitUseCase, readUserUseCase)
  }

  test('update asset', async () => {
    assetRepository.update.mockImplementationOnce(async (_) => (toOk(null)))
    assetRepository.find.mockImplementationOnce(async (_) => (toOk(asset)))

    const request = {
      id: asset.id,
      patch: {
        name: 'Best Asset'
      }
    }
    const result = await useCase().handle(request)
    const entity = expectToBeOk(result)
    expect(entity.id).toBe(request.id)
    expect(assetRepository.update).toBeCalledTimes(1)
    expect(assetRepository.find).toBeCalledTimes(1)
    expect(entity).toMatchObject(request.patch)
  })

  test('update asset to a unit of the same company', async () => {
    assetRepository.update.mockImplementationOnce(async (_) => (toOk(null)))
    assetRepository.find.mockImplementationOnce(async (_) => (toOk(asset)))
    readUnitUseCase.handle.mockResolvedValueOnce(toOk({ ...unit, companyId: asset.companyId }))

    const request = {
      id: asset.id,
      patch: {
        unitId: unit.id
      }
    }

    const result = await useCase().handle(request)
    const entity = expectToBeOk(result)
    expect(entity.id).toBe(request.id)
    expect(assetRepository.update).toBeCalledTimes(1)
    expect(assetRepository.find).toBeCalledTimes(1)
    expect(entity).toMatchObject(request.patch)
  })

  test('update asset to a assignee of the same company', async () => {
    assetRepository.update.mockImplementationOnce(async (_) => (toOk(null)))
    assetRepository.find.mockImplementationOnce(async (_) => (toOk(asset)))
    readUserUseCase.handle.mockResolvedValueOnce(toOk({ ...user, companyId: asset.companyId }))

    const request = {
      id: asset.id,
      patch: {
        assigneeId: user.id
      }
    }

    const result = await useCase().handle(request)
    const entity = expectToBeOk(result)

    expect(entity.id).toBe(request.id)
    expect(assetRepository.update).toBeCalledTimes(1)
    expect(assetRepository.find).toBeCalledTimes(1)
    expect(entity).toMatchObject(request.patch)
  })

  test('fails to update when changing asset to a unit of another company', async () => {
    assetRepository.find.mockImplementationOnce(async (_) => (toOk(asset)))
    readUnitUseCase.handle.mockResolvedValueOnce(toOk(unit))

    const request = {
      id: asset.id,
      patch: {
        unitId: unit.id
      }
    }

    const result = await useCase().handle(request)

    expect(result.ok).toBeFalsy()
    expect(assetRepository.update).toBeCalledTimes(0)
    expect(assetRepository.find).toBeCalledTimes(1)
  })

  test('fails to update when changing asset to a assignee of another company', async () => {
    assetRepository.find.mockImplementationOnce(async (_) => (toOk(asset)))
    readUserUseCase.handle.mockResolvedValueOnce(toOk(user))

    const request = {
      id: asset.id,
      patch: {
        assigneeId: user.id
      }
    }

    const result = await useCase().handle(request)

    expect(result.ok).toBeFalsy()
    expect(assetRepository.update).toBeCalledTimes(0)
    expect(assetRepository.find).toBeCalledTimes(1)
  })

  test('fails when asset is not found', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        name: 'new asset'
      }
    }
    assetRepository.find
      .mockImplementationOnce(async (_) =>
        new NotFoundError('Asset', { id: asset.id }).toResult()
      )

    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.NOT_FOUND)
    expect(assetRepository.update).not.toBeCalled()
  })

  test('fails when patch is invalid', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        name: ''
      }
    }
    assetRepository.find.mockImplementationOnce(async (_) => (toOk(asset)))
    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(ErrorCodes.VALIDATION_ERROR)
    expect(assetRepository.update).not.toBeCalled()
  })

  test('fails when a error occurs', async () => {
    const request = {
      id: '64628225f5b6a1023af42e91',
      patch: {
        name: 'Small town company'
      }
    }
    assetRepository.find.mockImplementationOnce(async (_) => (toOk(asset)))

    assetRepository.update.mockResolvedValueOnce(new InternalError(new Error('message')).toResult())

    const result = await useCase().handle(request) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(500)
    expect(assetRepository.update).toBeCalledTimes(1)
  })
})
