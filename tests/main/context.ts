import { ApplicationContext } from "../resources/context/application";


export type TestApplicationContext = {
    [ key in keyof ApplicationContext]: jest.Mocked<ApplicationContext[key]>
};

function mockedUseCase () {
    return {
        handle: jest.fn()
    }
}
export function getTestContext(): TestApplicationContext {
    return  {
        createCompanyUseCase: mockedUseCase(),
        readCompanyUseCase: mockedUseCase(),
        deleteCompanyUseCase: mockedUseCase(),
        updateCompanyUseCase: mockedUseCase(),
        listCompanyUseCase: mockedUseCase(),
    }
}
