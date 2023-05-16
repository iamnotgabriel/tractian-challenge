import { Result } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { ListCompanyUseCase } from "@/use-case/company/list-company";
import { PageRequest } from "@/domain/commons/types";

export class ListCompanyRoute extends Route {

    constructor(private readonly useCase: ListCompanyUseCase) {
        super();
    }
    
    register(router: Router) {
        router.get('/companies', this.handler);
    }

    async handle(req: Request, res: Response): Promise<void> {
        const request = PageRequest.from(req.query);
        if (!request.ok) {
            Route.respondWithError(res, request as Result.Err);
        } else {
            const result = await this.useCase.list(request.value);
            if (!result.ok) {
                Route.respondWithError(res, result as Result.Err);
            } else {
                res.status(StatusCode.OK).json(result.value);
            }
        }
    }

}
