import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { Route } from "@/api/route";
import { HttpResponse } from "../http/http-response";
import { ListUseCase } from "@/use-case/commons/use-case/list";
import { Asset, AssetPageRequest } from "@/domain/asset/entity";
import { ListRoute } from "../route/list";

export class ListAssetRoute extends Route {

    private readonly route: ListRoute<Asset>;

    constructor(useCase: ListUseCase<Asset>) {
        super();
        this.route = new ListRoute(useCase);
    }
    
    register(router: Router) {
        router.get('/assets', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        return this.route.handle(AssetPageRequest.from(req.query));
    }

}
