import { randomId } from '@/tests/commons'
import { AssetStatus, type CreateAssetDTO, createAsset, updateAsset } from '@/domain/asset/entity'
import { unit } from '@/tests/use-case/unit/stubs'
import { type Result } from '@/use-case/commons'
import { expectToBeOk } from '@/tests/result'
import { asset } from '@/tests/use-case/asset/stubs'

describe('domain/asset', () => {
  const assetDTO: CreateAssetDTO = {
    image: 'http://image.com/path/to/image.webp',
    name: 'Powerful Motor',
    description: 'A good motor',
    model: 'fiat uno',
    assigneeId: randomId(),
    status: AssetStatus.Running,
    healthLevel: 50,
    unitId: randomId()
  }

  test('create asset fails with wrong status', () => {
    expectToBeOk(createAsset({ ...assetDTO, status: 'Running' as AssetStatus }, unit))
    expectToBeOk(createAsset({ ...assetDTO, status: 'Alerting' as AssetStatus }, unit))
    expectToBeOk(createAsset({ ...assetDTO, status: 'Stopped' as AssetStatus }, unit))
    const asset = createAsset({
      ...assetDTO,
      status: 'Not Valid' as unknown as AssetStatus
    }, unit) as Result.Err

    expect(asset.ok).toBeFalsy()
    expect(asset.error.errorCode).toBe(400)
  })

  test('create asset fails when healthLevel is smaller than 0', () => {
    expectToBeOk(createAsset({ ...assetDTO, healthLevel: 0 }, unit))
    const asset = createAsset({
      ...assetDTO,
      healthLevel: -1
    }, unit) as Result.Err

    expect(asset.ok).toBeFalsy()
    expect(asset.error.errorCode).toBe(400)
  })

  test('update asset fails when patch contains a different companyId', () => {
    expectToBeOk(updateAsset(asset, { companyId: asset.companyId }))
    expectToBeOk(updateAsset(asset, {}))
    const result = updateAsset(asset, { companyId: randomId() }) as Result.Err

    expect(result.ok).toBeFalsy()
    expect(result.error.errorCode).toBe(400)
  })

  test('create asset fails when healthLevel is larger than 100', () => {
    expectToBeOk(createAsset({ ...assetDTO, healthLevel: 100 }, unit))
    const asset = createAsset({
      ...assetDTO,
      healthLevel: 101
    }, unit) as Result.Err

    expect(asset.ok).toBeFalsy()
    expect(asset.error.errorCode).toBe(400)
  })

  test('create asset adds companyId from unit', () => {
    const asset = expectToBeOk(createAsset(assetDTO, unit))

    expect(asset.companyId).toBe(unit.companyId)
  })

  test('create asset adds createdAt', () => {
    const asset = expectToBeOk(createAsset(assetDTO, unit))

    expect(asset).toHaveProperty('createdAt')
  })
})
