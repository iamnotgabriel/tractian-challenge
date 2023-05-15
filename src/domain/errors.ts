import { Result } from "@/use-case/commons";
import { ValidationErrorItem } from "joi"

export abstract class ApplicationError extends Error {
    constructor(message: string, public readonly errorCode: ErrorCodes) {
        super(message)
    }

    public toResult<T>(): Result.Err {
        return { ok: false, error: this }
    }

    public toJson() {
        return {
            message: this.message,
            errorCode: this.errorCode,
        }
    }
}
export abstract class DetailedError<T> extends ApplicationError {
    constructor(message: string, errorCode: ErrorCodes, public readonly details: T) {
        super(message, errorCode)
    }
    
    public toJson() {
        return { ...super.toJson(), details: this.details}
    }   
}

export class ValidationError extends DetailedError<ValidationErrorItem[]> {
    constructor(details: ValidationErrorItem[]) {
        super('Validation Error', ErrorCodes.VALIDATION_ERROR, details)
    }
}

export class NotFoundError extends DetailedError<Record<string, string | object>> {
    constructor(entity: string, details: Record<string, string | object>) {
        entity = entity.charAt(0).toUpperCase() + entity.substring(1);
        super(`${entity} Not Found`, ErrorCodes.NOT_FOUND, details);
    }
}

export class InternalError extends  ApplicationError {
    constructor(public readonly error: Error) {
        super('Internal Error', ErrorCodes.INTERNAL_ERROR);
    }
}

export enum ErrorCodes {
    VALIDATION_ERROR = 400,
    NOT_FOUND = 404,
    CONFLICT = 412,
    INTERNAL_ERROR = 500,
}


