import { ReadUseCase, ReadUseCaseImpl } from "@/use-case/commons/use-case/read";
import { DataContext, getDataContext } from "./data";
import { CreateCompanyUseCase, CreateCompanyUseCaseImpl } from "@/use-case/company/create-company";
import { UpdateCompanyUseCase, UpdateCompanyUseCaseImpl } from "@/use-case/company/update-company";
import { Company } from "@/domain/company/entity";
import { DeleteUseCase, DeleteUseCaseImpl } from "@/use-case/commons/use-case/delete";
import { ListUseCase, ListUseCaseImpl } from "@/use-case/commons/use-case/list";
import { CreateUserUseCase, CreateUserUseCaseImpl } from "@/use-case/user/create-user";
import { User } from "@/domain/user/entity";

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
    const readCompanyUseCase: ReadUseCase<Company> =
        new ReadUseCaseImpl('Company', dataContext.companyRepository);
    const updateCompanyUseCase: UpdateCompanyUseCase =
        new UpdateCompanyUseCaseImpl(dataContext.companyRepository);
    const deleteCompanyUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('Company', dataContext.companyRepository);
    const listCompanyUseCase: ListUseCase<Company> =
        new ListUseCaseImpl(dataContext.companyRepository);

    const createUserUseCase: CreateUserUseCase =
        new CreateUserUseCaseImpl(readCompanyUseCase, dataContext.userRepository);
    const readUserUseCase: ReadUseCase<User> =
        new ReadUseCaseImpl('User', dataContext.userRepository);
    const deleteUserUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('User', dataContext.userRepository);

    return {
        createCompanyUseCase,
        readCompanyUseCase,
        deleteCompanyUseCase,
        updateCompanyUseCase,
        listCompanyUseCase,
        createUserUseCase,
        readUserUseCase,
        deleteUserUseCase,
    };
}