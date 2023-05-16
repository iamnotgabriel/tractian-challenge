import { CreateCompanyUseCase, CreateCompanyUseCaseImpl } from "@/use-case/company/create-company";
import { getDataContext } from "./data";
import { ReadCompanyUseCase, ReadCompanyUseCaseImpl } from "@/use-case/company/read-company";
import { DeleteCompanyUseCase, DeleteCompanyUseCaseImpl } from "@/use-case/company/delete-company";
import { UpdateCompanyUseCase, UpdateCompanyUseCaseImpl } from "@/use-case/company/update-company";
import { ListCompanyUseCase, ListCompanyUseCaseImpl } from "@/use-case/company/list-company";

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
    const updateCompanyUseCase: UpdateCompanyUseCase =
        new UpdateCompanyUseCaseImpl(dataContext.companyRepository, readCompanyUseCase);
    const deleteCompanyUseCase: DeleteCompanyUseCase =
        new DeleteCompanyUseCaseImpl(dataContext.companyRepository);
    const listCompanyUseCase: ListCompanyUseCase =
        new ListCompanyUseCaseImpl(dataContext.companyRepository);

    return {
        createCompanyUseCase,
        readCompanyUseCase,
        deleteCompanyUseCase,
        updateCompanyUseCase,
        listCompanyUseCase,
    };
}
