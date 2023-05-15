import { Result } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { ReadCompanyUseCase } from "@/use-case/company/read-company";
import { NotFoundError } from "@/domain/errors";

export class ReadCompanyRoute extends Route {

    constructor(private readonly useCase: ReadCompanyUseCase) {
        super();
    }
    
    register(router: Router) {
        router.get('/companies/:companyId', this.handler);
    }

    async handle(req: Request, res: Response): Promise<void> {
        const id = req.params['companyId'];
        const result = await this.useCase.find(id);

        if (!result.ok) {
            Route.respondWithError(res, result as Result.Err);
        } else if (result.value != null) {
            res.status(StatusCode.OK).json(result.value);
        } else {
            const error = new NotFoundError('Company', req.params);
            res.status(error.errorCode).json(error.toJson());
        }
    }

}
