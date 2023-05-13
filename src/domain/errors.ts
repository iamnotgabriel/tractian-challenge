import { Result } from "@/use-case/commons";
import { ValidationErrorItem } from "joi"

export abstract class ApplicationError extends Error {
    constructor(message: string, public readonly errorCode: ErrorCodes) {
        super(message)
    }

    public toResult<T>(): Result.Err {
        return { ok: false, error: this }
    }
}

export class ValidationError extends ApplicationError {
    constructor(public readonly details: ValidationErrorItem[]) {
        super('Validation Error', ErrorCodes.VALIDATION_ERROR)
    }
}

export class InternalError extends  ApplicationError {
    constructor(public readonly error: Error) {
        super('Internal Error', ErrorCodes.INTERNAL_ERROR);
    }
}

export enum ErrorCodes {
    VALIDATION_ERROR = 400,
    CONFLICT = 412,
    INTERNAL_ERROR = 500,
}


