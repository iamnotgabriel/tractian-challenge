import { type SaveUserRepository } from '@/use-case/user/plugins'
import { type FindByIdRepository, type UpdateByIdRepository } from '@/use-case/commons/plugins'
import { type User } from '@/domain/user/entity'
import { randomId } from '@/tests/commons'

export type UserRepository =
    & jest.Mocked<SaveUserRepository>
    & jest.Mocked<FindByIdRepository<User>>
    & jest.Mocked<UpdateByIdRepository<User>>

export const userRepository: UserRepository = {
  save: jest.fn(),
  find: jest.fn(),
  update: jest.fn()
}

export const user: User = {
  id: randomId(),
  name: 'Admin',
  email: 'admin@company.com',
  createdAt: new Date(),
  companyId: randomId()
}
