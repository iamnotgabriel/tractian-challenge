import { CreateCompanyUseCase, CreateCompanyUseCaseImpl } from "@/use-case/company/create-company";
import { getDataContext } from "./data";
import { ReadCompanyUseCase, ReadCompanyUseCaseImpl } from "@/use-case/company/read-company";

export type ApplicationContext = Readonly<ReturnType<typeof loadContext>>;

let context: ApplicationContext;

export function getContext() {
    if(context == undefined) {
        context = Object.freeze(loadContext());
    }

    return context;
}

function loadContext() {
    const dataContext = getDataContext()
    const createCompanyUseCase: CreateCompanyUseCase =
        new CreateCompanyUseCaseImpl(dataContext.companyRepository);
    const readCompanyUseCase: ReadCompanyUseCase =
        new ReadCompanyUseCaseImpl(dataContext.companyRepository);

    return {
        createCompanyUseCase,
        readCompanyUseCase,
    };
}
