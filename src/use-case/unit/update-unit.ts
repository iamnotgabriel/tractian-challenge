import { UpdateObject } from "@/domain/commons/types";
import { UseCase } from "../commons/use-case";
import { Unit, updateUnit } from "@/domain/unit/entity";
import { ReadUseCaseImpl } from "../commons/use-case/read";
import { FindByIdRepository, UpdateByIdRepository } from "../commons/plugins";
import { UpdateUseCaseImpl } from "../commons/use-case/update";
import { Result } from "../commons";

export type UpdateUnitUseCase = UseCase<UpdateUnitUseCase.Request, UpdateUnitUseCase.Response>;

export namespace UpdateUnitUseCase {
    export type Request = {
        id: string,
        patch: UpdateObject<Unit>
    };
    export type Response = Unit;
}

export class UpdateUnitUseCaseImpl implements UpdateUnitUseCase {
    private readonly readUseCase: ReadUseCaseImpl<Unit>;
    private readonly updateUseCase: UpdateUseCaseImpl<Unit>;

    constructor(unitRepository: FindByIdRepository<Unit> & UpdateByIdRepository<Unit>) {
        this.readUseCase = new ReadUseCaseImpl('Unit', unitRepository);
        this.updateUseCase = new UpdateUseCaseImpl('Unit', unitRepository);
    }  

    async handle(request: UpdateUnitUseCase.Request): Promise<Result<Unit>> {
        let unit = await this.readUseCase.handle(request.id);
        if (unit.ok === false) {
            return unit;
        }
        unit = updateUnit(unit.value, request.patch);
        if (unit.ok  === false) {
            return unit;
        }
        
        const update = await this.updateUseCase.handle(request);
        if(update.ok === false) {
            return update;
        }

        return unit;
    }

}