import { type User } from '@/domain/user/entity'
import { type FindByIdRepository, type SaveRepository } from '../commons/plugins'
import { type ValueObject } from '@/domain/commons/types'

export type FindUserRepository = FindByIdRepository<User>
export type SaveUserRepository = SaveRepository<ValueObject<User>, User>
