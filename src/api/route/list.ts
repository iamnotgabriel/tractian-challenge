import { Result, toOk } from "@/use-case/commons";
import { HttpResponse } from "../http/http-response";
import { PageRequest } from "@/domain/commons/types";
import { StatusCode } from "../http/status-code";
import { ListUseCase } from "@/use-case/commons/use-case/list";

export class ListRoute<T> {

    constructor(private readonly useCase: ListUseCase<T> ) {}

    async handle(query: object): Promise<Result<HttpResponse>> {
        const request = PageRequest.from(query);
        if (request.ok == false ) {
            return request;
        } 
        const result = await this.useCase.handle(request.value);
        if (result.ok == false) {
            return result;
        }
        
        return toOk({
            status: StatusCode.OK,
            body: result.value 
        });
    }
}