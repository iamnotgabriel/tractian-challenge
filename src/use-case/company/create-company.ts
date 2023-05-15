import { Company, CreateCompanyDTO, createCompany } from "@/domain/company/entity";
import { SaveCompanyRepository } from "./plugins";
import { Result } from "@/use-case/commons";

export interface CreateCompanyUseCase  {
    create(dto: CreateCompanyDTO): Promise<Result<Company>>;
}

export class CreateCompanyUseCaseImpl implements CreateCompanyUseCase {

    constructor(private readonly companyRepository: SaveCompanyRepository) {}

    async create(dto: CreateCompanyDTO): Promise<Result<Company>> {
        const result = createCompany(dto);
        if(!result.ok) {
            return result as Result.Err;
        }

        return this.companyRepository.save(result.value);
    }

}
