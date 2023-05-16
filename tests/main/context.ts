import { CreateCompanyUseCase } from "@/use-case/company/create-company";
import { ApplicationContext } from "../resources/context/application";
import { ReadCompanyUseCase } from "@/use-case/company/read-company";
import { mock } from "node:test";

export type TestApplicationContext = {
    [ key in keyof ApplicationContext]: jest.Mocked<ApplicationContext[key]>
};

function mockedUseCase () {
    return {
        handle: jest.fn()
    }
}
export function getTestContext(): TestApplicationContext {
    
    const createCompanyUseCase: jest.Mocked<CreateCompanyUseCase> = mockedUseCase()
    
    const readCompanyUseCase: jest.Mocked<ReadCompanyUseCase> = mockedUseCase();

    const deleteCompanyUseCase = mockedUseCase();
    
    const updateCompanyUseCase = mockedUseCase();
    
    const listCompanyUseCase = mockedUseCase();

    return  {
        createCompanyUseCase,
        readCompanyUseCase,
        deleteCompanyUseCase,
        updateCompanyUseCase,
        listCompanyUseCase,
    }

}
