import { Company } from "@/domain/company/entity";
import { ListCompanyRepository } from "./plugins";
import { Result, toOk } from "@/use-case/commons";
import { getLogger } from "@/resources/logging";
import { Page, PageRequest } from "@/domain/commons/types";

export interface ListCompanyUseCase  {
    list(request: ListCompanyUseCase.Request): Promise<ListCompanyUseCase.Response>;
}

export namespace ListCompanyUseCase {
    export type Request = PageRequest;
    export type Response = Result<Page<Company>>;
}

const logger = getLogger('ListCompanyUseCase');
export class ListCompanyUseCaseImpl implements ListCompanyUseCase {

    constructor(private readonly companyRepository: ListCompanyRepository) {}

    async list(request: ListCompanyUseCase.Request): Promise<ListCompanyUseCase.Response> {
        const [total, list] = await Promise.all([
            this.companyRepository.countAll(),
            this.companyRepository.list(request)
        ]);
        if (!total.ok || !list.ok) {
            const result = !total.ok ? total as Result.Err : list as Result.Err;
            logger.error(result.error.message);
            return result;  
        }

        return toOk(Page.of(total.value, list.value));
    }

}
