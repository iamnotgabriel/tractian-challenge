import { DeleteCompanyRepository} from "./plugins";
import { Result } from "@/use-case/commons";
import { DeleteUseCase, DeleteUseCaseImpl } from "../commons/use-case.ts/delete";

export type DeleteCompanyUseCase = DeleteUseCase;

export class DeleteCompanyUseCaseImpl implements DeleteCompanyUseCase {
    private readonly deleteUseCase : DeleteUseCase;

    constructor(companyRepository: DeleteCompanyRepository) {
        this.deleteUseCase = new DeleteUseCaseImpl('Company', companyRepository);
    }

    async handle(id: string): Promise<Result<void>> {
        return this.deleteUseCase.handle(id);
    }
}
