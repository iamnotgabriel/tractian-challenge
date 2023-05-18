import { Result, toOk } from "@/use-case/commons";
import { Entity, PageRequest, UpdateObject, ValueObject } from "../commons/types";
import { validationSchema } from "../validation";
import Joi from "joi";
import { ConflictError, ValidationError } from "../errors";
import { Unit } from "../unit/entity";

export enum AssetStatus {
    Running = "Running",
    Alerting = "Alerting",
    Stopped = "Stopped",
}

export type CreateAssetDTO = {
    image: string,
    name: string,
    description: string,
    model: string,
    assigneeId: string,
    status: AssetStatus,
    healthLevel: number,
    unitId: string,
};

export type Asset = Entity<CreateAssetDTO> & { companyId: string };

const assetSchema = validationSchema<CreateAssetDTO>({
    image: Joi.string().min(1).required(),
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    model: Joi.string().min(1).required(),
    assigneeId: Joi.string().hex().length(24).required(),
    status: Joi.string().valid(...Object.values(AssetStatus)).required(),
    healthLevel: Joi.number().min(0).max(100).required(),
    unitId: Joi.string().hex().length(24).required(),
});

export function createAsset(dto: CreateAssetDTO, unit: Unit): Result<ValueObject<Asset>> {
    const { error, value } = assetSchema.validate(dto);
    if (error) {
        return new ValidationError(error.details).toResult();
    }

    dto = value as CreateAssetDTO;
    return toOk({
        ...dto,
        createdAt: new Date(),
        companyId: unit.companyId,
    })
}


export function updateAsset(asset:Asset, patch: UpdateObject<Asset>): Result<Asset> {
    const patchedAsset = Object.assign(asset, patch);
    if (patch.companyId) {
        return new ConflictError("Can't change asset to another company").toResult();
    }
    const {error, value} = assetSchema.validate(patchedAsset);
    if (error) {
        return new ValidationError(error.details).toResult();
    }

    return toOk(Object.assign(asset, value));
}

export class AssetPageRequest extends PageRequest {
    static readonly filterSchema = PageRequest.schema.keys({
        name: Joi.string().min(1),
        companyId: Joi.string().hex().length(24),
        unitId: Joi.string().hex().length(24),
        assigneeId: Joi.string().hex().length(24),
        createdAt: Joi.date(),
        model: Joi.string().min(1),
        healthLevel: Joi.number().min(0).max(100),
        status: Joi.string().valid(...Object.values(AssetStatus))
    }).options({ stripUnknown: true });

    static from(request: Record<string, any>): Result<PageRequest> {
        const {error, value} = AssetPageRequest.filterSchema.validate(request);
        if ( error ) {
            console.log(request);
            return new ValidationError(error.details).toResult();
        }
        
        return super.from(value);
    }
}