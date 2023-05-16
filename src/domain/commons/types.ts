import { Result, toOk } from "@/use-case/commons";
import { ValidationError } from "../errors";
import { validationSchema } from "../validation";
import Joi from "joi";

export type ValueObject<T> = Omit<T, "id">;
export type UpdateObject<T> = Partial<ValueObject<Omit<T, "createdAt">>>;
export type Entity<T> = T & { id: string };


export class Page<T> {
    constructor(
        public readonly total: number,
        public readonly data: T[]
    ) {}

    static of<T>(total: number, data: T[]): Page<T> {
        return new Page(total, data);
    }
};

export class PageRequest {
    private static readonly schema = validationSchema({
        limit: Joi.number().default(10),
        skip: Joi.number().default(0),
        sort: Joi.string()
            .optional()
            .default('id'),
    });

    constructor(
        public readonly limit: number,
        public readonly skip: number,
        public readonly sort: string
    ) {}

    static from(request: Record<string, any>): Result<PageRequest> {
        const {error, value} = PageRequest.schema.validate(request);
        if ( error ) {
            return new ValidationError(error.details).toResult();
        }

        return toOk(new PageRequest(value.limit, value.skip, value.sort));
    }
}
