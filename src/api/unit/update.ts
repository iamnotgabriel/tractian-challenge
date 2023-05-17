import { Unit } from "@/domain/unit/entity";
import { UpdateUnitUseCase } from "@/use-case/unit/update-unit";
import { UpdateRoute } from "../route/update";
import { Route } from "../route";
import { Result } from "@/use-case/commons";
import { Request, Router } from "express";

import { HttpResponse } from "../http/http-response";

export class UpdateUnitRoute extends Route {
    private readonly route: UpdateRoute<UpdateUnitUseCase.Request, Unit>;

    constructor(useCase: UpdateUnitUseCase) {
        super();
        this.route = new UpdateRoute(useCase);
    }

    handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params.unitId;
        const patch = req.body;
        return this.route.handle({id, patch});
    }


    register(router: Router) {
        router.patch('/units/:unitId', this.handler);
    }

}
