import { type Company, updateCompany } from '@/domain/company/entity'
import { type FindCompanyRepository, type UpdateCompanyRepository } from './plugins'
import { type Result } from '@/use-case/commons'
import { type UpdateObject } from '@/domain/commons/types'
import { type ReadUseCase, ReadUseCaseImpl } from '../commons/use-case/read'
import { type UpdateUseCase, UpdateUseCaseImpl } from '../commons/use-case/update'
import { type UseCase } from '../commons/use-case'

export type UpdateCompanyUseCase = UseCase<UpdateCompanyUseCase.Request, UpdateCompanyUseCase.Response>

export namespace UpdateCompanyUseCase {
  export type Request = {
    id: string
    patch: UpdateObject<Company>
  }
  export type Response = Company
}

export class UpdateCompanyUseCaseImpl implements UpdateCompanyUseCase {
  private readonly readUseCase: ReadUseCase<Company>
  private readonly updateUseCase: UpdateUseCase<Company>

  constructor (
    companyRepository: UpdateCompanyRepository & FindCompanyRepository
  ) {
    this.readUseCase = new ReadUseCaseImpl('Company', companyRepository)
    this.updateUseCase = new UpdateUseCaseImpl('Company', companyRepository)
  }

  async handle (request: UpdateCompanyUseCase.Request): Promise<Result<Company>> {
    let result = await this.readUseCase.handle(request.id)
    if (!result.ok) {
      return result
    }

    result = updateCompany(result.value, request.patch)
    if (!result.ok) {
      return result
    }

    const update = await this.updateUseCase.handle(request)
    if (!update.ok) {
      return update
    }

    return result
  }
}
