import { type Asset } from '@/domain/asset/entity'
import { type FindByIdRepository, type SaveRepository } from '../commons/plugins'
import { type ValueObject } from '@/domain/commons/types'

export type FindAssetRepository = FindByIdRepository<Asset>
export type SaveAssetRepository = SaveRepository<ValueObject<Asset>, Asset>
