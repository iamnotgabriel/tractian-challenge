import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { Route } from "@/api/route";
import { HttpResponse } from "../http/http-response";
import { Asset } from "@/domain/asset/entity";
import { ReadUseCase } from "@/use-case/commons/use-case/read";
import { ReadRoute } from "../route/read";

export class ReadAssetRoute extends Route {
    private readonly route: ReadRoute<Asset>;

    constructor(useCase: ReadUseCase<Asset>) {
        super();
        this.route = new ReadRoute(useCase);
    }
    
    register(router: Router) {
        router.get('/assets/:assetId', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['assetId'];
        return this.route.handle(id);
    }

}
