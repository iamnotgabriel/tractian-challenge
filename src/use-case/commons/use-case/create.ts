import { Result } from "@/use-case/commons";
import { UseCase } from ".";
import { SaveRepository } from "../plugins";
import { Logger } from "winston";
import { getLogger } from "@/resources/logging";

export type CreateUseCase<Req, Res> = UseCase<Req, Res>;

export class CreateUseCaseImpl<Req, Res> implements CreateUseCase<Req, Res> {
    private readonly logger: Logger;

    constructor(
        private readonly entity: string,
        private readonly repository: SaveRepository<Req, Res>
    ) {
        this.logger = getLogger(`Create${entity}UseCase`);
    }
    
    async handle(request: Req): Promise<Result<Res>>  {
        const result = await this.repository.save(request);
        if (result.ok) {
            this.logger.info(`created ${this.entity}=${result.value.id}`)
        }

        return result;
    }
}
