import { CreateUnitDTO, Unit, createUnit } from "@/domain/unit/entity";
import { CreateUseCase, CreateUseCaseImpl } from "../commons/use-case/create";
import { UseCase } from "../commons/use-case";
import { SaveUnitRepository } from "./plugings";
import { ReadUseCase } from "../commons/use-case/read";
import { Company } from "@/domain/company/entity";
import { ValueObject } from "@/domain/commons/types";

export type CreateUnitUseCase = CreateUseCase<CreateUnitDTO, Unit>;

export class CreateUnitUseCaseImpl implements CreateUnitUseCase {
    private readonly createUseCase: CreateUseCaseImpl<ValueObject<Unit>, Unit>;

    constructor(
        unitRepository: SaveUnitRepository,
        private readonly readCompanyUseCase: ReadUseCase<Company>
    ) {
        this.createUseCase = new CreateUseCaseImpl('Unit', unitRepository);
    }

    async handle(dto: CreateUnitDTO): UseCase.Response<Unit> {
        const unit = createUnit(dto);
        if (unit.ok === false) {
            return unit;
        }

        const company = await this.readCompanyUseCase.handle(unit.value.companyId);
        if (company.ok === false) {
            return company;
        }

        return this.createUseCase.handle(unit.value);
    }
}