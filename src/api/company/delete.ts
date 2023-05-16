import { Result, toOk } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { HttpResponse } from "../http/http-reponse";
import { DeleteUseCase } from "@/use-case/commons/use-case/delete";

export class DeleteCompanyRoute extends Route {

    constructor(private readonly useCase: DeleteUseCase) {
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
