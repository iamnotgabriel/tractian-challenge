import { CompanyMongoRepository } from "@/data/company/repository";
import { Context } from "../../context";

export class DataContext extends Context<DataContext> {
    companyRepository: CompanyMongoRepository;
}