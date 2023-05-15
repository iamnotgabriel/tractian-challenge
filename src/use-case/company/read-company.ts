import { Company } from "@/domain/company/entity";
import { FindCompanyRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { getLogger } from "@/resources/logging";

export interface ReadCompanyUseCase  {
    find(id: ReadCompanyUseCase.Request): ReadCompanyUseCase.Response;
}

export namespace ReadCompanyUseCase {
    export type Request = string;
    export type Response = Promise<Result<Company>>;
}

const logger = getLogger('ReadCompanyUseCase');
export class ReadCompanyUseCaseImpl implements ReadCompanyUseCase {

    constructor(private readonly companyRepository: FindCompanyRepository) {}

    async find(id: ReadCompanyUseCase.Request): Promise<Result<Company>> {
        const result = await this.companyRepository.find(id);
        this.logResult(id, result);

        return result;
    }
    
    private logResult(id: string, result: Result<Company>): void  {
        const company = `company id=${id}`;
        if(result.ok && result.value != null) {
            logger.info(`found ${company}`);
        } if (result.ok) {
            logger.info(`${company} not found`);
        } else {
            result = result as Result.Err;
            logger.error(`${result.error.message} finding ${company}`)
        }
    }

}
