import { Company, CreateCompanyDTO, createCompany } from "@/domain/company/entity";
import { SaveCompanyRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { getLogger } from "@/resources/logging";

export interface CreateCompanyUseCase  {
    create(dto: CreateCompanyDTO): Promise<Result<Company>>;
}

const logger = getLogger('CreateCompanyUseCase')
export class CreateCompanyUseCaseImpl implements CreateCompanyUseCase {

    constructor(private readonly companyRepository: SaveCompanyRepository) {}

    async create(dto: CreateCompanyDTO): Promise<Result<Company>> {
        const result = createCompany(dto);
        if(!result.ok) {
            return result as Result.Err;
        }
        logger.info(`creating company '${result.value.name}'`);        

        return this.companyRepository.save(result.value);
    }

}
