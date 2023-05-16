import { Company, updateCompany } from "@/domain/company/entity";
import { UpdateCompanyRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { UpdateObject } from "@/domain/commons/types";
import { ReadCompanyUseCase } from "./read-company";

export interface UpdateCompanyUseCase  {
    update(id: UpdateCompanyUseCase.Request): UpdateCompanyUseCase.Response;
}

export namespace UpdateCompanyUseCase {
    export type Request = {
        id: string,
        patch: UpdateObject<Company>
    };
    export type Response = Promise<Result<Company>>;
}

export class UpdateCompanyUseCaseImpl implements UpdateCompanyUseCase {

    constructor(
        private readonly companyRepository: UpdateCompanyRepository,
        private readonly readCompanyUseCase: ReadCompanyUseCase,
    ) {}

    async update(request: UpdateCompanyUseCase.Request): Promise<Result<Company>> {
        let result = await this.readCompanyUseCase.find(request.id);
        if (!result.ok) {
            return result;
        }

        result = updateCompany(result.value, request.patch);
        if (!result.ok) {
            return result;
        }

        let updateResult  = await this.companyRepository.update(request);
        if (updateResult.ok == false) {
            return updateResult;
        }

        return result;
    }

}
