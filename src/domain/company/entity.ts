import Joi from "joi";
import { validationSchema, ValidationError } from "@/domain/validation";

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
    document: Joi.string().pattern(/\d+/)
});

export function createCompany(dto : CreateCompanyDTO): Omit<Company, "id"> {
    const {error, value} = companySchema.validate(dto);
    if (error) {
        throw new ValidationError(error.details)
    }
    return {
        ...value,
        createdAt: new Date(), 
    }
}
