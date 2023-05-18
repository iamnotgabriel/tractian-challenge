import { Asset, updateAsset } from "@/domain/asset/entity";
import { FindAssetRepository } from "./plugins";
import { Result } from "@/use-case/commons";
import { UpdateObject } from "@/domain/commons/types";
import { ReadUseCase, ReadUseCaseImpl } from "../commons/use-case/read";
import { UpdateUseCase, UpdateUseCaseImpl } from "../commons/use-case/update";
import { UseCase } from "../commons/use-case";
import { UpdateByIdRepository } from "../commons/plugins";

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
    ) {
        this.readUseCase = new ReadUseCaseImpl('Asset', assetRepository);
        this.updateUseCase = new UpdateUseCaseImpl('Asset', assetRepository);
    }

    async handle(request: UpdateAssetUseCase.Request): Promise<Result<Asset>> {
        let result = await this.readUseCase.handle(request.id);
        if (!result.ok) {
            return result;
        }

        result = updateAsset(result.value, request.patch);
        if (!result.ok) {
            return result;
        }
        
        const update = await this.updateUseCase.handle(request);
        if(update.ok === false) {
            return update;
        }

        return result;
    }

}
