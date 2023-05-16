import { User } from "@/domain/user/entity";
import { FindUserRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { NotFoundError } from "@/domain/errors";

export interface ReadUserUseCase  {
    find(id: ReadUserUseCase.Request): Promise<ReadUserUseCase.Response>;
}

export namespace ReadUserUseCase {
    export type Request = string;
    export type Response = Result<User>;
}

export class ReadUserUseCaseImpl implements ReadUserUseCase {

    constructor(private readonly userRepository: FindUserRepository) {}

    async find(id: ReadUserUseCase.Request): Promise<Result<User>> {
        const result = await this.userRepository.find(id);
    
        if (result.ok && result.value == null) {
            return new NotFoundError('user', {id}).toResult();
        }

        return result;
    }

}
