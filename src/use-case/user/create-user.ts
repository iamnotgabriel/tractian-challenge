import { SaveUserRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { CreateUseCase, CreateUseCaseImpl } from "../commons/use-case/create";
import { ValueObject } from "@/domain/commons/types";
import { CreateUserDTO, User, createUser } from "@/domain/user/entity";
import { ReadUseCase } from "../commons/use-case/read";
import { Company } from "@/domain/company/entity";

export type CreateUserUseCase  = CreateUseCase<CreateUserDTO, User>;

export class CreateUserUseCaseImpl implements CreateUserUseCase {
    private readonly createUseCase: CreateUseCaseImpl<ValueObject<User>, User>;

    constructor(private readonly readCompanyUseCase: ReadUseCase<Company>, userRepository: SaveUserRepository, ) {
        this.createUseCase = new CreateUseCaseImpl('User', userRepository);
    }

    async handle(dto: CreateUserDTO): Promise<Result<User>> {
        const user = createUser(dto);
        if (user.ok === false) {
            return user;
        }
        const company = await this.readCompanyUseCase.handle(user.value.companyId);
        if (company.ok === false) {
            return company;
        }

        return this.createUseCase.handle(user.value);
    }

}
