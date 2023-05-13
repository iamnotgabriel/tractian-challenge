import { ApplicationError, InternalError } from "@/domain/errors";


export type Result<T, E = ApplicationError> =
    | Result.Ok<T>
    | Result.Err<E>;

export namespace Result {
    export type Ok<T> = { ok: true, value: T };
    export type Err<E = ApplicationError> = {ok: false, error: E};
}


export function toOk<T>(value: T): Result.Ok<T>{
    return  { ok: true, value };
}
export async function fromPromise<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        const result = await promise;
        return {
            ok: true,
            value: result,
        }
    } catch (error) {
        if (error instanceof ApplicationError) {
            return error.toResult();
        } else {
            return new InternalError(error).toResult()
        }
    }
}