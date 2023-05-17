import { Result } from "@/use-case/commons";
import { Request, Router } from "express";
import { HttpResponse } from "../http/http-response";
import { Route } from "../route";
import { CreateUserUseCase } from "@/use-case/user/create-user";


export class CreateUserRoute extends Route {

    constructor(private readonly createUserUseCase: CreateUserUseCase) {
        super();
    }
    
    handle(req: Request): Promise<Result<HttpResponse>> {
        throw new Error("Method not implemented.");
    }

    register(router: Router) {
        router.post('/users', this.handler);
    }
    
}