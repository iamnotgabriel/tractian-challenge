import { type Company, type CreateCompanyDTO } from '@/domain/company/entity'
import { type DeleteByIdRepository, type FindByIdRepository, type ListRepository, type SaveRepository, type UpdateByIdRepository } from '../commons/plugins'

export type SaveCompanyRepository = SaveRepository<CreateCompanyDTO, Company>

export type FindCompanyRepository = FindByIdRepository<Company>

export type DeleteCompanyRepository = DeleteByIdRepository

export type UpdateCompanyRepository = UpdateByIdRepository<Company>

export type ListCompanyRepository = ListRepository<Company>
