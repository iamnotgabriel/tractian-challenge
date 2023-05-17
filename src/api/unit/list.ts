import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { Route } from "@/api/route";
import { HttpResponse } from "../http/http-response";
import { ListUseCase } from "@/use-case/commons/use-case/list";
import { Unit } from "@/domain/unit/entity";
import { ListRoute } from "../route/list";

export class ListUnitRoute extends Route {

    private readonly route: ListRoute<Unit>;

    constructor(useCase: ListUseCase<Unit>) {
        super();
        this.route = new ListRoute(useCase);
    }
    
    register(router: Router) {
        router.get('/units', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        return this.route.handle(req.query);
    }

}
