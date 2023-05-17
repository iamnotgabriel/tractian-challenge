import { UpdateObject } from "@/domain/commons/types";
import { UseCase } from "../commons/use-case";
import { User, updateUser } from "@/domain/user/entity";
import { ReadUseCaseImpl } from "../commons/use-case/read";
import { FindByIdRepository, UpdateByIdRepository } from "../commons/plugins";
import { UpdateUseCaseImpl } from "../commons/use-case/update";
import { Result } from "../commons";

export type UpdateUserUseCase = UseCase<UpdateUserUseCase.Request, UpdateUserUseCase.Response>;

export namespace UpdateUserUseCase {
    export type Request = {
        id: string,
        patch: UpdateObject<User>
    };
    export type Response = User;
}

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
    private readonly readUseCase: ReadUseCaseImpl<User>;
    private readonly updateUseCase: UpdateUseCaseImpl<User>;

    constructor(userRepository: FindByIdRepository<User> & UpdateByIdRepository<User>) {
        this.readUseCase = new ReadUseCaseImpl('User', userRepository);
        this.updateUseCase = new UpdateUseCaseImpl('User', userRepository);
    }  

    async handle(request: UpdateUserUseCase.Request): Promise<Result<User>> {
        let user = await this.readUseCase.handle(request.id);
        if (user.ok === false) {
            return user;
        }
        user = updateUser(user.value, request.patch);
        if (user.ok  === false) {
            return user;
        }
        
        const update = await this.updateUseCase.handle(request);
        if(update.ok === false) {
            return update;
        }

        return user;
    }

}