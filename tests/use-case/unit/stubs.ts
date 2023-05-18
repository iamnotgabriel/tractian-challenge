import { type Unit } from '@/domain/unit/entity'
import { type FindByIdRepository, type SaveRepository, type UpdateByIdRepository } from '../commons/plugins'
import { type ValueObject } from '@/domain/commons/types'
import { randomId } from '@/tests/commons'

export type UnitRepository =
    & jest.Mocked<SaveRepository<ValueObject<Unit>, Unit>>
    & jest.Mocked<FindByIdRepository<Unit>>
    & jest.Mocked<UpdateByIdRepository<Unit>>

export const unitRepository: UnitRepository = {
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn()
}

export const unit: Unit = {
  id: randomId(),
  name: 'A Unit',
  createdAt: new Date(),
  companyId: randomId()
}
