import { UpdateObject, ValueObject } from "@/domain/commons/types";
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
    export type Response = Result<Company | null>;
}


export interface DeleteCompanyRepository {
    delete(id: DeleteCompanyRepository.Request): Promise<DeleteCompanyRepository.Response>
}

export namespace DeleteCompanyRepository {
    export type Request = string;
    export type Response = Result<void>;
}

export interface UpdateCompanyRepository {
    update(id: UpdateCompanyRepository.Request): Promise<UpdateCompanyRepository.Response>
}

export namespace UpdateCompanyRepository {
    export type Request = {
        id: string,
        patch: UpdateObject<Company>,
    };
    export type Response = Result<void>;
}

