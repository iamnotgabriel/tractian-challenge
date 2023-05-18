import { type Unit } from '@/domain/unit/entity'
import { type FindByIdRepository, type SaveRepository } from '../commons/plugins'
import { type ValueObject } from '@/domain/commons/types'

export type FindUserRepository = FindByIdRepository<Unit>
export type SaveUnitRepository = SaveRepository<ValueObject<Unit>, Unit>
