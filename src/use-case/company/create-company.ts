import { type Company, type CreateCompanyDTO, createCompany } from '@/domain/company/entity'
import { type SaveCompanyRepository } from './plugins'
import { type Result } from '@/use-case/commons'
import { type CreateUseCase, CreateUseCaseImpl } from '../commons/use-case/create'
import { type ValueObject } from '@/domain/commons/types'

export type CreateCompanyUseCase = CreateUseCase<CreateCompanyDTO, Company>

export class CreateCompanyUseCaseImpl implements CreateCompanyUseCase {
  private readonly createUseCase: CreateUseCaseImpl<ValueObject<Company>, Company>

  constructor (companyRepository: SaveCompanyRepository) {
    this.createUseCase = new CreateUseCaseImpl('Company', companyRepository)
  }

  async handle (dto: CreateCompanyDTO): Promise<Result<Company>> {
    const company = createCompany(dto)
    if (company.ok === false) {
      return company
    }
    return this.createUseCase.handle(company.value)
  }
}
