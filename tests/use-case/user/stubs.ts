import { SaveUserRepository } from "@/use-case/user/plugins";
import { FindByIdRepository, UpdateByIdRepository } from "@/use-case/commons/plugins";
import { User } from "@/domain/user/entity";

export type UserRepository =
    & jest.Mocked<SaveUserRepository>
    & jest.Mocked<FindByIdRepository<User>>
    & jest.Mocked<UpdateByIdRepository<User>>;

export const userRepository: UserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
};
