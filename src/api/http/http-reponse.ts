import { StatusCode } from "./status-code"
import { ApplicationError, ErrorCodes } from "@/domain/errors"


export type HttpResponse<T= any> = {
    status: StatusCode | ErrorCodes,
    body: T;
    headers?: Record<string, string>,
}