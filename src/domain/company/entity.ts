import Joi from "joi";
import { validationSchema } from "@/domain/validation";
import { ValueObject } from "../commons/types";
import { Result } from "@/use-case/commons";
import { ValidationError } from "../errors";

export type CreateCompanyDTO = {
    name: string
    document: string
}

export type Company = CreateCompanyDTO & {
    id: string,
    createdAt: Date,
};

const companySchema = validationSchema<CreateCompanyDTO>({
    name: Joi.string().min(1),
    document: Joi.string(),
});

export function createCompany(dto : CreateCompanyDTO): Result<ValueObject<Company>> {
    const {error, value} = companySchema.validate(dto);
    if (error) {
        return new ValidationError(error.details).toResult();
    }
    return {
        ok: true,
        value: {
            ...value,
            createdAt: new Date()
        }
    }
}
