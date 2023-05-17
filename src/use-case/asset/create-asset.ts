import { CreateAssetDTO, Asset, createAsset } from "@/domain/asset/entity";
import { CreateUseCase, CreateUseCaseImpl } from "../commons/use-case/create";
import { UseCase } from "../commons/use-case";
import { SaveAssetRepository } from "./plugins";
import { ReadUseCase } from "../commons/use-case/read";
import { ValueObject } from "@/domain/commons/types";
import { Unit } from "@/domain/unit/entity";
import { User } from "@/domain/user/entity";
import { ConflictError } from "@/domain/errors";

export type CreateAssetUseCase = CreateUseCase<CreateAssetDTO, Asset>;

export class CreateAssetUseCaseImpl implements CreateAssetUseCase {
    private readonly createUseCase: CreateUseCaseImpl<ValueObject<Asset>, Asset>;

    constructor(
        assetRepository: SaveAssetRepository,
        private readonly readUnitUseCase: ReadUseCase<Unit>,
        private readonly readUserUseCase: ReadUseCase<User>
    ) {
        this.createUseCase = new CreateUseCaseImpl('Asset', assetRepository);
    }

    async handle(dto: CreateAssetDTO): UseCase.Response<Asset> {
        const unit = await this.readUnitUseCase.handle(dto.unitId);
        if (unit.ok === false) {
            return unit;
        }
        
        const user = await this.readUserUseCase.handle(dto.assigneeId);
        if (user.ok === false) {
            return user;
        }

        if (user.value.companyId != unit.value.companyId) {
            return new ConflictError('Assignee can only register asset in the same company').toResult();
        }

        const asset = createAsset(dto, unit.value);
        if (asset.ok === false) {
            return asset;
        }

        return this.createUseCase.handle(asset.value);
    }
}