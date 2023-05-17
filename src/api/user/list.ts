import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { Route } from "@/api/route";
import { HttpResponse } from "../http/http-response";
import { ListUseCase } from "@/use-case/commons/use-case/list";
import { User } from "@/domain/user/entity";
import { ListRoute } from "../route/list";

export class ListUserRoute extends Route {

    private readonly route: ListRoute<User>;

    constructor(useCase: ListUseCase<User>) {
        super();
        this.route = new ListRoute(useCase);
    }
    
    register(router: Router) {
        router.get('/users', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        return this.route.handle(req.query);
    }

}
