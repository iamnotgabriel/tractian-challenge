import { Result, toOk } from "@/use-case/commons";
import { Request, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { HttpResponse } from "../http/http-reponse";
import { Company } from "@/domain/company/entity";
import { ReadUseCase } from "@/use-case/commons/use-case/read";

export class ReadCompanyRoute extends Route {

    constructor(private readonly useCase: ReadUseCase<Company>) {
        super();
    }
    
    register(router: Router) {
        router.get('/companies/:companyId', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['companyId'];
        const result = await this.useCase.handle(id);

        if (result.ok == false) {
            return result;
        }
    
        return toOk({
            status: StatusCode.OK,
            body: result.value
        })
    }

}
