import { DeleteCompanyRepository} from "./plugins";
import { Result } from "@/use-case/commons";
import { getLogger } from "@/resources/logging";

export interface DeleteCompanyUseCase  {
    delete(id: DeleteCompanyUseCase.Request): Promise<DeleteCompanyUseCase.Response>;
}

export namespace DeleteCompanyUseCase {
    export type Request = string;
    export type Response = Result<void>;
}

const logger = getLogger('DeleteCompanyUseCase')
export class DeleteCompanyUseCaseImpl implements DeleteCompanyUseCase {

    constructor(private readonly companyRepository: DeleteCompanyRepository) {}

    async delete(id: string): Promise<Result<void>> {
        const result  = await this.companyRepository.delete(id);

        this.logResult(id, result);
        
        return result;
    }

    logResult(id: string, result: Result<void>) {
        if (result.ok) {
            logger.info(`deleted company id=${id}`);
        } else {
            logger.error(`error deleting company id=${id}`)
        }
    }

}
