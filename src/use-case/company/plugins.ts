import { ValueObject } from "@/domain/commons/types";
import { Company, CreateCompanyDTO } from "@/domain/company/entity";

export interface SaveCompanyRepository {
    save(company: SaveCompanyRepository.Request) : Promise<Company>
}

export namespace SaveCompanyRepository {
    export type Request = ValueObject<Company>;
}