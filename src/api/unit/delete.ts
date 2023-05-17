import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { Route } from "@/api/route";
import { HttpResponse } from "../http/http-response";
import { DeleteUseCase } from "@/use-case/commons/use-case/delete";
import { DeleteRoute } from "../route/delete";

export class DeleteUnitRoute extends Route {
    private readonly route: DeleteRoute;

    constructor(useCase: DeleteUseCase) {
        super();
        this.route = new DeleteRoute(useCase)
    }
    
    register(router: Router) {
        router.delete('/units/:unitId', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['unitId'];
        return this.route.handle(id);
    }

}
