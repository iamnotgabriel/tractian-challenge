import { CreateCompanyDTO, Company } from "@/domain/company/entity";
import { SaveCompanyRepository } from "@/use-case/company/plugins";


export const saveCompanyRepositoryStub: jest.Mocked<SaveCompanyRepository> = {
    save: jest.fn()
}