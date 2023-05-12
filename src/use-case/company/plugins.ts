import { Company, CreateCompanyDTO } from "@/domain/company/entity";

export interface SaveCompanyRepository {
    save(dto: SaveCompanyRepository.Request) : Promise<Company>
}

export namespace SaveCompanyRepository {
    export type Request = Omit<Company, "id">;
}