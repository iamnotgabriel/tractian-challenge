import { Result, toOk } from "@/use-case/commons";
import { Request, Router } from "express";
import { HttpResponse } from "../http/http-response";
import { Route } from "../route";
import { CreateUserUseCase } from "@/use-case/user/create-user";
import { CreateUserDTO } from "@/domain/user/entity";
import { StatusCode } from "../http/status-code";
import { configuration } from "@/resources/context/configuration";
import { Headers } from "../http/headers";


export class CreateUserRoute extends Route {

    constructor(private readonly createUserUseCase: CreateUserUseCase) {
        super();
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const dto = req.body as CreateUserDTO;
        const result = await this.createUserUseCase.handle(dto)
        if (result.ok) {
            const contentLocation = `${configuration.serverDomain}/api/v1/users/${result.value.id}`;

            return toOk({
                status: StatusCode.CREATED,
                body: result.value,
                headers: {
                    [Headers.CONTENT_LOCATION]: contentLocation 
                }
            })
        } 
    }

    register(router: Router) {
        router.post('/users', this.handler);
    }
    
}
