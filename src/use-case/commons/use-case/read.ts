import { Result } from "@/use-case/commons";
import { UseCase } from ".";
import { FindByIdRepository } from "../plugins";
import { Logger } from "winston";
import { getLogger } from "@/resources/logging";
import { NotFoundError } from "@/domain/errors";


export type ReadUseCase<Res> = UseCase<string, Res>;

export class ReadUseCaseImpl<Res> implements ReadUseCase<Res> {
    private readonly logger: Logger;

    constructor(
        private readonly entity: string,
        private readonly repository: FindByIdRepository<Res>
    ) {
        this.logger = getLogger(`Read${entity}UseCase`);
    }
    
    async handle(id: string): Promise<Result<Res>>  {
        const result = await this.repository.find(id);
        if (result.ok && result.value == null) {
            this.logger.warn(`${this.entity}=${id} not found`);
            return new NotFoundError(this.entity, {id}).toResult();
        }
        return result;
    }
}
