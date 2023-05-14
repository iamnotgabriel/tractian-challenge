import { CompanyMongoRepository } from "@/data/company/repository";
import { DataContext } from "@/main/application-context/data";

export class DataContextLoader {
    static load(): DataContext {
        const companyRepository = new CompanyMongoRepository();
        return new DataContext({ companyRepository });
    }
}