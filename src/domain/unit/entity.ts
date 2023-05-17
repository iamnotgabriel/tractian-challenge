import Joi from "joi";
import { Entity, PageRequest, ValueObject } from "../commons/types"
import { validationSchema } from "../validation";
import { Result, toOk } from "@/use-case/commons";
import { ValidationError } from "../errors";

export type CreateUnitDTO = {
    name: string,
    companyId: string,
}

export type Unit = Entity<CreateUnitDTO>;

const unitSchema = validationSchema<CreateUnitDTO>({
    name: Joi.string().min(1).max(32).required(),
    companyId: Joi.string().required(),
});

export function createUnit(dto: CreateUnitDTO): Result<ValueObject<Unit>> {
    const  {error, value} = unitSchema.validate(dto);
    if (error) {
        return new ValidationError(error.details).toResult();
    }
    const unit = value as CreateUnitDTO;
    return toOk({
        ...unit,
        createdAt: new Date()
    });
}

export class UnitPageRequest extends PageRequest {
    static filterSchema = Joi.object({
        name: Joi.string().min(1).max(32),
        companyId: Joi.string(),
        createdAt: Joi.date(),
    });

    static from(request: Record<string, any>): Result<PageRequest> {
        const {error, value} = UnitPageRequest.filterSchema.validate(request);
        if ( error ) {
            console.log(request);
            return new ValidationError(error.details).toResult();
        }
        
        return super.from(value);
    }
}