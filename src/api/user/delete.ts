import { Result, toOk } from "@/use-case/commons";
import { Request, Router } from "express";
import { HttpResponse } from "../http/http-response";
import { Route } from "../route";
import { DeleteUseCase } from "@/use-case/commons/use-case/delete";
import { StatusCode } from "../http/status-code";

export class DeleteUserRoute extends Route {

    constructor(private readonly useCase: DeleteUseCase) {
        super();
    }
    
    async handle(req: Request): Promise<Result<HttpResponse>> {
        const id = req.params['userId'];
        const result = await this.useCase.handle(id);

        if (result.ok == false) {
            return result;
        } 

        return toOk({
            status: StatusCode.NO_CONTENT,
            body: undefined,
        });
    }

    register(router: Router) {
        router.delete('/users/:userId', this.handler);
    }

}