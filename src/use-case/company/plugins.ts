import { Company, CreateCompanyDTO } from "@/domain/company/entity";
import { DeleteByIdRepository, FindByIdRepository, ListRepository, SaveRepository, UpdateByIdRepository } from "../commons/plugins";

export type SaveCompanyRepository = SaveRepository<CreateCompanyDTO, Company>;

export type FindCompanyRepository = FindByIdRepository<Company>;

export type DeleteCompanyRepository = DeleteByIdRepository;

export type UpdateCompanyRepository =  UpdateByIdRepository<Company>;

export type ListCompanyRepository = ListRepository<Company>;
