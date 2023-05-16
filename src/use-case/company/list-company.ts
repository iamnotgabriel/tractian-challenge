import { Company } from "@/domain/company/entity";
import { FindCompanyRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { getLogger } from "@/resources/logging";
import { NotFoundError } from "@/domain/errors";

export interface ReadCompanyUseCase  {
    find(id: ReadCompanyUseCase.Request): Promise<ReadCompanyUseCase.Response>;
}

export namespace ReadCompanyUseCase {
    export type Request = string;
    export type Response = Result<Company>;
}

const logger = getLogger('ReadCompanyUseCase');
export class ReadCompanyUseCaseImpl implements ReadCompanyUseCase {

    constructor(private readonly companyRepository: FindCompanyRepository) {}

    async find(id: ReadCompanyUseCase.Request): Promise<Result<Company>> {
        const result = await this.companyRepository.find(id);
    
        if (result.ok && result.value == null) {
            logger.warn(`company=${id} not found`);
            return new NotFoundError('Company', {id}).toResult();
        }

        return result;
    }

}
