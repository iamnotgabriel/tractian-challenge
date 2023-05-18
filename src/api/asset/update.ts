import { Asset } from "@/domain/asset/entity";
import { UpdateAssetUseCase } from "@/use-case/asset/update-asset";
import { UpdateRoute } from "../route/update";
import { Route } from "../route";
import { Result } from "@/use-case/commons";
import { Request, Router } from "express";

import { HttpResponse } from "../http/http-response";

export class UpdateAssetRoute extends Route {
    private readonly route: UpdateRoute<UpdateAssetUseCase.Request, Asset>;

    constructor(useCase: UpdateAssetUseCase) {
        super();
        this.route = new UpdateRoute(useCase);
    }

    handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params.assetId;
        const patch = req.body;
        return this.route.handle({id, patch});
    }


    register(router: Router) {
        router.patch('/assets/:assetId', this.handler);
    }

}
