import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { HttpResponse } from "../http/http-response";
import { Route } from "../route";
import { CreateUserUseCase } from "@/use-case/user/create-user";
import { configuration } from "@/resources/context/configuration";
import { CreateRoute } from "../route/create";
import { CreateUserDTO, User } from "@/domain/user/entity";


export class CreateUserRoute extends Route {
    private readonly createRoute: CreateRoute<CreateUserDTO, User>;

    constructor(createUserUseCase: CreateUserUseCase) {
        super();
        this.createRoute = new CreateRoute(
            createUserUseCase,
            `${configuration.serverDomain}/api/v1/users/:id`
        );
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const dto = req.body as CreateUserDTO;
        return this.createRoute.handle(dto);
    }

    register(router: Router) {
        router.post('/users', this.handler);
    }
    
}
