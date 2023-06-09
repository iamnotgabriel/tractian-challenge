import { type Asset, AssetStatus } from '@/domain/asset/entity'
import { type FindByIdRepository, type SaveRepository, type UpdateByIdRepository } from '../commons/plugins'
import { type ValueObject } from '@/domain/commons/types'
import { randomId } from '@/tests/commons'

export type AssetRepository =
    & jest.Mocked<SaveRepository<ValueObject<Asset>, Asset>>
    & jest.Mocked<FindByIdRepository<Asset>>
    & jest.Mocked<UpdateByIdRepository<Asset>>

export const assetRepository: AssetRepository = {
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn()
}

export const asset: Asset = {
  id: randomId(),
  name: 'Great Motor',
  image: 'http://image.com/path/to/image.png',
  description: 'gOld but great motor',
  model: 'great-motor-is-a-unique-model',
  assigneeId: randomId(),
  status: AssetStatus.Running,
  healthLevel: 0,
  unitId: randomId(),
  createdAt: new Date(),
  companyId: randomId()
}
