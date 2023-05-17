import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { Route } from "@/api/route";
import { HttpResponse } from "../http/http-response";
import { Unit } from "@/domain/unit/entity";
import { ReadUseCase } from "@/use-case/commons/use-case/read";
import { ReadRoute } from "../route/read";

export class ReadUnitRoute extends Route {
    private readonly route: ReadRoute<Unit>;

    constructor(useCase: ReadUseCase<Unit>) {
        super();
        this.route = new ReadRoute(useCase);
    }
    
    register(router: Router) {
        router.get('/units/:unitId', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['unitId'];
        return this.route.handle(id);
    }

}
