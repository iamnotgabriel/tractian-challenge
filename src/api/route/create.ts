import { CreateUseCase } from "@/use-case/commons/use-case/create";
import { HttpResponse } from "../http/http-response";
import { Headers } from "../http/headers";
import { Result, toOk } from "@/use-case/commons";
import { StatusCode } from "../http/status-code";

export class CreateRoute<T, R extends { id: string }> {
    constructor(
        private readonly createUseCase: CreateUseCase<T, R>, 
        private readonly contentLocation: string
    ) {}

    async handle(request: T): Promise<Result<HttpResponse<R>>> {
        const result = await this.createUseCase.handle(request)
        if (result.ok) {
            const contentLocation = this.getContentLocation(result.value.id);
            return toOk({
                status: StatusCode.CREATED,
                body: result.value,
                headers: {
                    [Headers.CONTENT_LOCATION]: contentLocation 
                }
            })
        }

        return result as Result.Err;
    }

    private getContentLocation(id: string) {
        return this.contentLocation.replace(":id", id);
    }
}