import { Company } from "@/domain/company/entity";
import { randomId } from "@/tests/commons";
import { DeleteCompanyRepository, FindCompanyRepository, ListCompanyRepository, SaveCompanyRepository, UpdateCompanyRepository } from "@/use-case/company/plugins";


export type CompanyRepository =
    & jest.Mocked<SaveCompanyRepository>
    & jest.Mocked<FindCompanyRepository>
    & jest.Mocked<DeleteCompanyRepository>
    & jest.Mocked<UpdateCompanyRepository>
    & jest.Mocked<ListCompanyRepository>;

export const companyRepository: CompanyRepository = {
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
    count: jest.fn(),
};

export const company: Company = {
    id: randomId(),
    name: 'Super company',
    document: '0987654321',
    createdAt: new Date(),
};