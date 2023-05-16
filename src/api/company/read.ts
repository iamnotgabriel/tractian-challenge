import { Result, toOk } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { ReadCompanyUseCase } from "@/use-case/company/read-company";
import { HttpResponse } from "../http/http-reponse";

export class ReadCompanyRoute extends Route {

    constructor(private readonly useCase: ReadCompanyUseCase) {
        super();
    }
    
    register(router: Router) {
        router.get('/companies/:companyId', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['companyId'];
        const result = await this.useCase.find(id);

        if (result.ok == false) {
            return result;
        }
    
        return toOk({
            status: StatusCode.OK,
            body: result.value
        })
    }

}
