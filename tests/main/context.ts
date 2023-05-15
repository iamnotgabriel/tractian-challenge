import { CreateCompanyUseCase } from "@/use-case/company/create-company";
import { ApplicationContext } from "./context/application";



export type TestApplicationContext = {
    [ key in keyof ApplicationContext]: jest.Mocked<ApplicationContext[key]>
};

export function getTestContext(): TestApplicationContext {
    
    const createCompanyUseCase: jest.Mocked<CreateCompanyUseCase> = {
        create: jest.fn()
    };

    return  {
        createCompanyUseCase,
    }

}
