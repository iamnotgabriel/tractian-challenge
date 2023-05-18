import { ReadUseCase, ReadUseCaseImpl } from "@/use-case/commons/use-case/read";
import { getDataContext } from "./data";
import { CreateCompanyUseCase, CreateCompanyUseCaseImpl } from "@/use-case/company/create-company";
import { UpdateCompanyUseCase, UpdateCompanyUseCaseImpl } from "@/use-case/company/update-company";
import { Company } from "@/domain/company/entity";
import { DeleteUseCase, DeleteUseCaseImpl } from "@/use-case/commons/use-case/delete";
import { ListUseCase, ListUseCaseImpl } from "@/use-case/commons/use-case/list";
import { CreateUserUseCase, CreateUserUseCaseImpl } from "@/use-case/user/create-user";
import { User } from "@/domain/user/entity";
import { UpdateUserUseCase, UpdateUserUseCaseImpl } from "@/use-case/user/update-user";
import { CreateUnitUseCase, CreateUnitUseCaseImpl } from "@/use-case/unit/create-unit";
import { Unit } from "@/domain/unit/entity";
import { UpdateUnitUseCase, UpdateUnitUseCaseImpl } from "@/use-case/unit/update-unit";
import { CreateAssetUseCase, CreateAssetUseCaseImpl } from "@/use-case/asset/create-asset";
import { Asset } from "@/domain/asset/entity";
import { UpdateAssetUseCase, UpdateAssetUseCaseImpl } from "@/use-case/asset/update-asset";

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
    const updateUserUseCase: UpdateUserUseCase =
        new UpdateUserUseCaseImpl(dataContext.userRepository);
    const deleteUserUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('User', dataContext.userRepository);
    const listUserUseCase: ListUseCase<User> =
        new ListUseCaseImpl(dataContext.userRepository);
    
    const createUnitUseCase: CreateUnitUseCase =
        new CreateUnitUseCaseImpl(dataContext.unitRepository, readCompanyUseCase);
    const readUnitUseCase: ReadUseCase<Unit> =
        new ReadUseCaseImpl('Unit', dataContext.unitRepository);
    const updateUnitUseCase: UpdateUnitUseCase =
        new UpdateUnitUseCaseImpl(dataContext.unitRepository);
    const deleteUnitUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('Unit', dataContext.unitRepository);
    const listUnitUseCase: ListUseCase<Unit> =
        new ListUseCaseImpl(dataContext.unitRepository);

    const createAssetUseCase: CreateAssetUseCase =
        new CreateAssetUseCaseImpl(
            dataContext.assetRepository,
            readUnitUseCase,
            readUserUseCase,
        );
    const readAssetUseCase: ReadUseCase<Asset> =
        new ReadUseCaseImpl('Asset', dataContext.assetRepository);
    const updateAssetUseCase: UpdateAssetUseCase =
        new UpdateAssetUseCaseImpl(dataContext.assetRepository, readUnitUseCase, readUserUseCase);
    const deleteAssetUseCase: DeleteUseCase =
        new DeleteUseCaseImpl('Asset', dataContext.assetRepository);
    const listAssetUseCase: ListUseCase<Asset> =
        new ListUseCaseImpl(dataContext.assetRepository);
    
    return {
        createCompanyUseCase,
        readCompanyUseCase,
        deleteCompanyUseCase,
        updateCompanyUseCase,
        listCompanyUseCase,
        createUserUseCase,
        readUserUseCase,
        updateUserUseCase,
        deleteUserUseCase,
        listUserUseCase,
        createUnitUseCase,
        readUnitUseCase,
        updateUnitUseCase,
        deleteUnitUseCase,
        listUnitUseCase,
        createAssetUseCase,
        readAssetUseCase,
        updateAssetUseCase,
        deleteAssetUseCase,
        listAssetUseCase,
    };
}