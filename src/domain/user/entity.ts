import Joi from "joi";
import { Entity, ValueObject } from "../commons/types";
import { validationSchema } from "../validation";
import { Result, toOk } from "@/use-case/commons";
import { ValidationError } from "../errors";


export type CreateUserDTO = {
    name: string,
    email: string,
    companyId: string,
};

export type User = Entity<CreateUserDTO>;


const userSchema = validationSchema<CreateUserDTO>({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    companyId: Joi.string(),
});

export function createUser(dto: CreateUserDTO): Result<ValueObject<User>> {
    const { error, value } = userSchema.validate(dto);
    
    if (error) {
        return new ValidationError(error.details).toResult();
    }

    return toOk({
        ...value,
        createdAt: new Date(),
    })

}
