import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { HttpResponse } from "../http/http-response";
import { Route } from "../route";
import { User } from "@/domain/user/entity";
import { ReadUseCase } from "@/use-case/commons/use-case/read";
import { ReadRoute } from "../route/read";


export class ReadUserRoute extends Route {
    private readonly route: ReadRoute<User>;

    constructor(readUserUseCase: ReadUseCase<User>) {
        super();
        this.route = new ReadRoute(readUserUseCase);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params.userId;
        return this.route.handle(id);
    }

    register(router: Router) {
        router.get('/users/:userId', this.handler);
    }
    
}
