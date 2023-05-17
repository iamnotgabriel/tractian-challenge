import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { Route } from "@/api/route";
import { HttpResponse } from "../http/http-response";
import { DeleteUseCase } from "@/use-case/commons/use-case/delete";
import { DeleteRoute } from "../route/delete";

export class DeleteCompanyRoute extends Route {
    private readonly route: DeleteRoute;

    constructor(useCase: DeleteUseCase) {
        super();
        this.route = new DeleteRoute(useCase)
    }
    
    register(router: Router) {
        router.delete('/companies/:companyId', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['companyId'];
        return this.route.handle(id);
    }

}
