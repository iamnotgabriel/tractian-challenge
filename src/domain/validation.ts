import Joi from "joi";


type SchemaObject<T> = {
    [key in keyof T]: Joi.AnySchema<any>;
};

export function validationSchema<T>(schema: SchemaObject<T>): Joi.ObjectSchema {
    return Joi.object(schema).options({stripUnknown: true});
}