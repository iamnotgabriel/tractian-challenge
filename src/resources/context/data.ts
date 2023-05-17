import { CompanyMongoRepository } from "@/data/company/repository";
import { UserMongoRepository } from "@/data/user/repository";

export type DataContext = Readonly<ReturnType<typeof loadContext>>;

let dataContext: DataContext;

export function getDataContext() {
    if(dataContext == undefined) {
        dataContext = Object.freeze(loadContext());
    }

    return dataContext;
}

function loadContext() {
    const companyRepository = new CompanyMongoRepository();
    const userRepository = new UserMongoRepository();

    return {
        companyRepository,
        userRepository,
    };
}
