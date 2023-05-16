import { Company } from "@/domain/company/entity";
import { FindCompanyRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { ReadUseCase, ReadUseCaseImpl } from "../commons/use-case.ts/read";

export type ReadCompanyUseCase = ReadUseCase<Company>;

export class ReadCompanyUseCaseImpl implements ReadCompanyUseCase {
    private readonly readUseCase: ReadUseCase<Company>;

    constructor(companyRepository: FindCompanyRepository) {
        this.readUseCase = new ReadUseCaseImpl('Company', companyRepository);
    }

    async handle(id: string): Promise<Result<Company>> {
        return await this.readUseCase.handle(id);
    }

}
