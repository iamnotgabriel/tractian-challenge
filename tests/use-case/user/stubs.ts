import { SaveUserRepository } from "@/use-case/user/plugins";

export type UserRepository =
    & jest.Mocked<SaveUserRepository>;

export const userRepository: UserRepository = {
    save: jest.fn(),
};
