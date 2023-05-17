import { Result, toOk } from "@/use-case/commons";
import { Request, Router } from "express";
import { HttpResponse } from "../http/http-response";
import { Route } from "../route";
import { User } from "@/domain/user/entity";
import { StatusCode } from "../http/status-code";
import { configuration } from "@/resources/context/configuration";
import { Headers } from "../http/headers";
import { ReadUseCase } from "@/use-case/commons/use-case/read";


export class ReadUserRoute extends Route {

    constructor(private readonly readUserUseCase: ReadUseCase<User>) {
        super();
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params.userId;
        const result = await this.readUserUseCase.handle(id)
        if (result.ok) {
            return toOk({
                status: StatusCode.OK,
                body: result.value,
            })
        }

        return result as Result.Err;
    }

    register(router: Router) {
        router.get('/users/:userId', this.handler);
    }
    
}
