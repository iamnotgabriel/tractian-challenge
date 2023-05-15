import { DeleteCompanyRepository, FindCompanyRepository, SaveCompanyRepository, UpdateCompanyRepository } from "@/use-case/company/plugins";


export type CompanyRepository =
    & jest.Mocked<SaveCompanyRepository>
    & jest.Mocked<FindCompanyRepository>
    & jest.Mocked<DeleteCompanyRepository>
    & jest.Mocked<UpdateCompanyRepository>;

export const companyRepository: CompanyRepository = {
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
};
