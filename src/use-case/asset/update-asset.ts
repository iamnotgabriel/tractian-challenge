import { Asset, updateAsset } from "@/domain/asset/entity";
import { FindAssetRepository } from "./plugins";
import { Result, toOk } from "@/use-case/commons";
import { UpdateObject } from "@/domain/commons/types";
import { ReadUseCase, ReadUseCaseImpl } from "../commons/use-case/read";
import { UpdateUseCase, UpdateUseCaseImpl } from "../commons/use-case/update";
import { UseCase } from "../commons/use-case";
import { UpdateByIdRepository } from "../commons/plugins";
import { Unit } from "@/domain/unit/entity";
import { User } from "@/domain/user/entity";
import { ConflictError } from "@/domain/errors";

export type UpdateAssetUseCase = UseCase<UpdateAssetUseCase.Request, UpdateAssetUseCase.Response> 

export namespace UpdateAssetUseCase {
    export type Request = {
        id: string,
        patch: UpdateObject<Asset>
    };
    export type Response = Asset;
}

export class UpdateAssetUseCaseImpl implements UpdateAssetUseCase {
    private readonly readUseCase: ReadUseCase<Asset>;
    private readonly updateUseCase: UpdateUseCase<Asset>;

    constructor(
        assetRepository: UpdateByIdRepository<Asset> & FindAssetRepository,
        private readonly readUnitUseCase: ReadUseCase<Unit>,
        private readonly readUserUseCase: ReadUseCase<User>
    ) {
        this.readUseCase = new ReadUseCaseImpl('Asset', assetRepository);
        this.updateUseCase = new UpdateUseCaseImpl('Asset', assetRepository);
    }

    async handle(request: UpdateAssetUseCase.Request): Promise<Result<Asset>> {
        let old = await this.readUseCase.handle(request.id);
        if (!old.ok) {
            return old;
        }

        const asset = updateAsset(old.value, request.patch);
        if (!asset.ok) {
            return asset;
        }
        const valid = await this.validateChange(asset.value, request.patch);
        if (valid.ok === false) {
            return valid;
        }
        
        const update = await this.updateUseCase.handle(request);
        if(update.ok === false) {
            return update;
        }
        return asset;
    }

    private async validateChange(asset: Asset, patch: UpdateObject<Asset>): Promise<Result<void>> {
        if (patch.unitId) {
            const unit = await this.readUnitUseCase.handle(patch.unitId);
            if(unit.ok === false) {
                return unit;
            }
            if (unit.value.companyId != asset.companyId) {
                return new ConflictError("Can't change asset to a unit of another company").toResult();
            }
        }
        if (patch.assigneeId) {
            const user = await this.readUserUseCase.handle(patch.assigneeId);
            if (user.ok === false) {
                return user
            }
            if (user.value.companyId  != asset.companyId) {
                return new ConflictError("Can't transfer asset a assignee of another company").toResult();
            }
        }
        return toOk(null)
    }

}
