import { Company } from "@/domain/company/entity";
import { ListCompanyRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { Page, PageRequest } from "@/domain/commons/types";
import { ListUseCase, ListUseCaseImpl } from "../commons/use-case.ts/list";

export type ListCompanyUseCase = ListUseCase<Company> 

export class ListCompanyUseCaseImpl implements ListUseCase<Company> {
    private readonly listUseCase: ListUseCase<Company>;
    
    constructor(companyRepository: ListCompanyRepository) {
        this.listUseCase = new ListUseCaseImpl(companyRepository);
    }

    async handle(request: PageRequest): Promise<Result<Page<Company>>> {
        return this.listUseCase.handle(request);
    }

}
