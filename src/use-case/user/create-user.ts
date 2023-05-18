import { type SaveUserRepository } from './plugins'
import { type Result } from '@/use-case/commons'
import { type CreateUseCase, CreateUseCaseImpl } from '../commons/use-case/create'
import { type ValueObject } from '@/domain/commons/types'
import { type CreateUserDTO, type User, createUser } from '@/domain/user/entity'
import { type ReadUseCase } from '../commons/use-case/read'
import { type Company } from '@/domain/company/entity'

export type CreateUserUseCase = CreateUseCase<CreateUserDTO, User>

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  private readonly createUseCase: CreateUseCaseImpl<ValueObject<User>, User>

  constructor (private readonly readCompanyUseCase: ReadUseCase<Company>, userRepository: SaveUserRepository) {
    this.createUseCase = new CreateUseCaseImpl('User', userRepository)
  }

  async handle (dto: CreateUserDTO): Promise<Result<User>> {
    const user = createUser(dto)
    if (user.ok === false) {
      return user
    }
    const company = await this.readCompanyUseCase.handle(user.value.companyId)
    if (company.ok === false) {
      return company
    }

    return this.createUseCase.handle(user.value)
  }
}
