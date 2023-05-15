import { Result } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { UpdateCompanyUseCase } from "@/use-case/company/update-company";
import { UpdateObject } from "@/domain/commons/types";
import { Company } from "@/domain/company/entity";

export class UpdateCompanyRoute extends Route {

    constructor(private readonly useCase: UpdateCompanyUseCase) {
        super();
    }
    
    register(router: Router) {
        router.patch('/companies/:companyId', this.handler);
    }

    async handle(req: Request, res: Response): Promise<void> {
        const id = req.params['companyId'];
        const patch = req.body as UpdateObject<Company>;
        const result = await this.useCase.update({id, patch});

        if (!result.ok) {
            Route.respondWithError(res, result as Result.Err);
        } else {
            res.status(StatusCode.OK).send(result.value);
        }
    }

}
