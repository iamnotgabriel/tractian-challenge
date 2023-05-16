import { CreateCompanyDTO } from "@/domain/company/entity";
import { Result, toOk } from "@/use-case/commons";
import { CreateCompanyUseCase } from "@/use-case/company/create-company";
import { Request, Response, Router} from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { Headers } from "@/api/http/headers";
import { configuration } from "@/resources/context/configuration";
import { HttpResponse } from "../http/http-reponse";

export class CreateCompanyRoute extends Route {

    constructor(private readonly useCase: CreateCompanyUseCase) {
        super();
    }

    public register(router: Router) {
        router.post('/companies', this.handler);
    }

    async handle(req: Request): Promise<Result<HttpResponse>> {
        const body = req.body as CreateCompanyDTO;
        const result = await this.useCase.handle(body);
        if (result.ok == false) {
            return result;
        }

        const { id } = result.value;
        const contentLocation = `${configuration.serverDomain}/api/v1/companies/${id}`;
        return toOk({
            status: StatusCode.CREATED,
            body: result.value,
            headers: {
                [Headers.CONTENT_LOCATION]: contentLocation,
            }
        })
    }

}
