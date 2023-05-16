import { Result, toErr, toOk } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { PageRequest } from "@/domain/commons/types";
import { HttpResponse } from "../http/http-reponse";
import { ListUseCase } from "@/use-case/commons/use-case/list";
import { Company } from "@/domain/company/entity";

export class ListCompanyRoute extends Route {

    constructor(private readonly useCase: ListUseCase<Company>) {
        super();
    }
    
    register(router: Router) {
        router.get('/companies', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const request = PageRequest.from(req.query);
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
