import { CompanyMongoRepository } from "@/data/company/repository";

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

    return {
        companyRepository
    };
}