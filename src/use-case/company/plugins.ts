import { ValueObject } from "@/domain/commons/types";
import { Company } from "@/domain/company/entity";
import { Result } from "../commons";

export interface SaveCompanyRepository {
    save(company: SaveCompanyRepository.Request) : Promise<SaveCompanyRepository.Response>
}

export namespace SaveCompanyRepository {
    export type Request = ValueObject<Company>;
    export type Response = Result<Company>;
}

export interface FindCompanyRepository {
    find(id: FindCompanyRepository.Request): Promise<FindCompanyRepository.Response>
}

export namespace FindCompanyRepository {
    export type Request = string;
    export type Response = Result<Company>;
}
