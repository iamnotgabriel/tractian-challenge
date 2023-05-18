import { type ApplicationError } from '@/domain/errors'

export type Result<T, E = ApplicationError> =
    | Result.Ok<T>
    | Result.Err<E>

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace Result {
  export type Ok<T> = { ok: true, value: T }
  export type Err<E = ApplicationError> = { ok: false, error: E }
}

export function toOk<T> (value: T): Result.Ok<T> {
  return { ok: true, value }
}

export function toErr<T= ApplicationError> (error: T): Result.Err<T> {
  return { ok: false, error }
}
