import { CreateCompanyUseCase } from "@/use-case/company/create-company";
import { ApplicationContext } from "./context/application";
import { ReadCompanyUseCase } from "@/use-case/company/read-company";

export type TestApplicationContext = {
    [ key in keyof ApplicationContext]: jest.Mocked<ApplicationContext[key]>
};

export function getTestContext(): TestApplicationContext {
    
    const createCompanyUseCase: jest.Mocked<CreateCompanyUseCase> = {
        create: jest.fn()
    };
    
    const readCompanyUseCase: jest.Mocked<ReadCompanyUseCase> = {
        find: jest.fn()
    };

    const deleteCompanyUseCase = {
        delete: jest.fn(),
    };
    
    const updateCompanyUseCase = {
        update: jest.fn(),
    }

    return  {
        createCompanyUseCase,
        readCompanyUseCase,
        deleteCompanyUseCase,
        updateCompanyUseCase,
    }

}
