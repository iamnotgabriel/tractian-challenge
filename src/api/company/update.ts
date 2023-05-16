import { Result, toOk } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { UpdateCompanyUseCase } from "@/use-case/company/update-company";
import { UpdateObject } from "@/domain/commons/types";
import { Company } from "@/domain/company/entity";
import { HttpResponse } from "../http/http-reponse";

export class UpdateCompanyRoute extends Route {

    constructor(private readonly useCase: UpdateCompanyUseCase) {
        super();
    }
    
    register(router: Router) {
        router.patch('/companies/:companyId', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['companyId'];
        const patch = req.body as UpdateObject<Company>;
        const result = await this.useCase.handle({id, patch});

        if (result.ok== false) {
            return result;
        }

        return toOk({
            status: StatusCode.OK,
            body: result.value,
        });
    }

}
