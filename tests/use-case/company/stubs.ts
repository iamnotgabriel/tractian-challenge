import { FindCompanyRepository, SaveCompanyRepository } from "@/use-case/company/plugins";

export const saveCompanyRepositoryStub: jest.Mocked<SaveCompanyRepository> = {
    save: jest.fn(),
}

export const readCompanyUseCaseStub: jest.Mocked<FindCompanyRepository> = {
    find: jest.fn(),
} 