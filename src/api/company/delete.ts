import { Result } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { DeleteCompanyUseCase } from "@/use-case/company/delete-company";

export class DeleteCompanyRoute extends Route {

    constructor(private readonly useCase: DeleteCompanyUseCase) {
        super();
    }
    
    register(router: Router) {
        router.delete('/companies/:companyId', this.handler);
    }

    async handle(req: Request, res: Response): Promise<void> {
        const id = req.params['companyId'];
        const result = await this.useCase.delete(id);

        if (!result.ok) {
            Route.respondWithError(res, result as Result.Err);
        } else {
            res.status(StatusCode.NO_CONTENT).send();
        }
    }

}
