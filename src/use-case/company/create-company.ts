import { Company, CreateCompanyDTO, createCompany } from "@/domain/company/entity";
import { SaveCompanyRepository } from "./plugins";

export interface CreateCompanyUseCase  {
    create(dto: CreateCompanyDTO): Promise<Company>;
}




export class CreateCompanyUseCaseImpl implements CreateCompanyUseCase {

    constructor(private readonly companyRepository: SaveCompanyRepository) {}

    create(dto: CreateCompanyDTO): Promise<Company> {
        // TODO: add logger
        // TODO: add 
        const company = createCompany(dto);
        return this.companyRepository.save(company);
    }

}