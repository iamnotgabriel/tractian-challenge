import Joi, { ValidationErrorItem } from "joi";

export class ValidationError extends Error {
    constructor(public readonly details: ValidationErrorItem[]) {
        super('Validation Error')
    }
}

type SchemaObject<T> = {
    [key in keyof T]: Joi.AnySchema<any>;
};
export function validationSchema<T>(schema: SchemaObject<T>): Joi.ObjectSchema {
    return Joi.object(schema).options({stripUnknown: true});
}