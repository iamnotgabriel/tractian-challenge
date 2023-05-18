import { CreateAssetUseCaseImpl } from '@/use-case/asset/create-asset'
import { getTestContext } from '@/tests/main/context'
import { assetRepository } from './stubs'
import { expectToBeOk } from '@/tests/result'
import { toOk } from '@/use-case/commons'
import { AssetStatus, type CreateAssetDTO } from '@/domain/asset/entity'
import { NotFoundError } from '@/domain/errors'
import { unit } from '../unit/stubs'
import { user } from '../user/stubs'
import { ObjectId } from 'mongodb'
import { randomId } from '@/tests/commons'

describe('use-case/asset/create-asset', () => {
  const { readUnitUseCase, readUserUseCase } = getTestContext()

  function useCase (): CreateAssetUseCaseImpl {
    return new CreateAssetUseCaseImpl(assetRepository, readUnitUseCase, readUserUseCase)
  }
  const assetDTO: CreateAssetDTO = {
    name: 'Great Motor',
    image: 'http://image.com/path/to/image.png',
    description: 'gOld but great motor',
    model: 'great-motor-is-a-unique-model',
    assigneeId: randomId(),
    status: AssetStatus.Running,
    healthLevel: 0,
    unitId: new ObjectId().toHexString()
  }

  beforeEach(() => jest.clearAllMocks())

  test('creates new asset', async () => {
    assetRepository.save.mockImplementation(async (asset) => (toOk({
      ...asset,
      id: randomId()
    })))
    const companyId = randomId()
    readUnitUseCase.handle.mockResolvedValueOnce(toOk({ ...unit, companyId }))
    readUserUseCase.handle.mockResolvedValueOnce(toOk({ ...user, companyId }))

    const result = await useCase().handle(assetDTO)
    const entity = expectToBeOk(result)

    expect(entity).toHaveProperty('id')
    expect(readUnitUseCase.handle).toBeCalledTimes(1)
    expect(readUserUseCase.handle).toBeCalledTimes(1)
    expect(assetRepository.save).toBeCalledTimes(1)
  })

  test('fails to create asset when company does no exist', async () => {
    assetRepository.save.mockImplementation(async (asset) => (toOk({
      ...asset,
      id: randomId()
    })))
    readUnitUseCase.handle
      .mockResolvedValueOnce(new NotFoundError('Unit', { id: assetDTO.unitId }).toResult())

    const result = await useCase().handle(assetDTO)

    expect(result.ok).toBeFalsy()
    expect(readUnitUseCase.handle).toBeCalledTimes(1)
    expect(readUserUseCase.handle).toBeCalledTimes(0)
    expect(assetRepository.save).toBeCalledTimes(0)
  })

  test('fails to create asset when dto is invalid', async () => {
    readUnitUseCase.handle
      .mockResolvedValueOnce(toOk(unit))

    readUserUseCase.handle
      .mockResolvedValueOnce(toOk({ ...user, companyId: unit.companyId }))

    const result = await useCase().handle({
      ...assetDTO,
      name: ''
    })

    expect(result.ok).toBeFalsy()
    expect(readUnitUseCase.handle).toBeCalledTimes(1)
    expect(readUserUseCase.handle).toBeCalledTimes(1)
    expect(assetRepository.save).toBeCalledTimes(0)
  })

  test('fails to create asset when unit is from other company', async () => {
    readUnitUseCase.handle
      .mockResolvedValueOnce(toOk(unit))

    readUserUseCase.handle
      .mockResolvedValueOnce(toOk(user))

    const result = await useCase().handle(assetDTO)

    expect(result.ok).toBeFalsy()
    expect(readUnitUseCase.handle).toBeCalledTimes(1)
    expect(readUserUseCase.handle).toBeCalledTimes(1)
    expect(assetRepository.save).toBeCalledTimes(0)
  })
})
