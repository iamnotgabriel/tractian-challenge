import { Result, toOk } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { DeleteCompanyUseCase } from "@/use-case/company/delete-company";
import { HttpResponse } from "../http/http-reponse";

export class DeleteCompanyRoute extends Route {

    constructor(private readonly useCase: DeleteCompanyUseCase) {
        super();
    }
    
    register(router: Router) {
        router.delete('/companies/:companyId', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['companyId'];
        const result = await this.useCase.handle(id);

        if (result.ok == false) {
            return result;
        } 

        return toOk({
            status: StatusCode.NO_CONTENT,
            body: undefined,
        });
    }

}
