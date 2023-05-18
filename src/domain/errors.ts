import { type Result } from '@/use-case/commons'

export abstract class ApplicationError extends Error {
  constructor (message: string, public readonly errorCode: ErrorCodes) {
    super(message)
  }

  public toResult (): Result.Err<this> {
    return { ok: false, error: this }
  }

  public toJson (): object {
    return {
      message: this.message,
      errorCode: this.errorCode
    }
  }
}
export abstract class DetailedError<T> extends ApplicationError {
  constructor (message: string, errorCode: ErrorCodes, public readonly details: T) {
    super(message, errorCode)
  }

  public toJson (): object {
    return { ...super.toJson(), details: this.details }
  }
}

export class ValidationError extends DetailedError<object[] | object> {
  constructor (details: object[] | object) {
    super('Validation Error', ErrorCodes.VALIDATION_ERROR, details)
  }
}

export class NotFoundError extends DetailedError<Record<string, string | object>> {
  constructor (entity: string, details: Record<string, string | object>) {
    entity = entity.charAt(0).toUpperCase() + entity.substring(1)
    super(`${entity} Not Found`, ErrorCodes.NOT_FOUND, details)
  }
}

export class InternalError extends ApplicationError {
  // eslint-disable-next-line n/handle-callback-err
  constructor (public readonly error: Error) {
    super('Internal Error', ErrorCodes.INTERNAL_ERROR)
  }
}

export class ConflictError extends DetailedError<string> {
  constructor (detail: string) {
    super('Conflict Error', ErrorCodes.VALIDATION_ERROR, detail)
  }
}

export enum ErrorCodes {
  VALIDATION_ERROR = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}
