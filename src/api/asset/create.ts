import { Asset, CreateAssetDTO } from "@/domain/asset/entity";
import { Result } from "@/use-case/commons";
import { CreateAssetUseCase } from "@/use-case/asset/create-asset";
import { Request, Router} from "express";
import { Route } from "@/api/route";
import { configuration } from "@/resources/context/configuration";
import { HttpResponse } from "../http/http-response";
import { CreateRoute } from "../route/create";

export class CreateAssetRoute extends Route {
    
    private readonly createRoute: CreateRoute<CreateAssetDTO, Asset>;
    
    constructor(createUserUseCase: CreateAssetUseCase) {
        super();
        this.createRoute = new CreateRoute(
            createUserUseCase,
            `${configuration.serverDomain}/api/v1/assets/:id`
        );
    }
    
    async handle(req: Request): Promise<Result<HttpResponse>> {
        const dto = req.body as CreateAssetDTO;
        return this.createRoute.handle(dto);
    }
    
    public register(router: Router) {
        router.post('/assets', this.handler);
    }
}
