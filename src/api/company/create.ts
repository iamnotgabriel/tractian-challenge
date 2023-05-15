import { CreateCompanyDTO } from "@/domain/company/entity";
import { Result } from "@/use-case/commons";
import { CreateCompanyUseCase } from "@/use-case/company/create-company";
import {Request, Response} from "express";
import { Route } from "@/api/route";
import { StatusCode } from "../http/status-code";
import { Headers } from "@/api/http/headers";

export class CreateCompanyRoute extends Route {

    constructor(private readonly useCase: CreateCompanyUseCase) {
        super();
    }

    protected async handle(req: Request, res: Response): Promise<void> {
        const body = req.body as CreateCompanyDTO;
        const result = await this.useCase.create(body);
        if (!result.ok) {
            Route.respondWithError(res, result as Result.Err);
        } else {
            const { id } = result.value;

            res.setHeader(Headers.CONTENT_LOCATION, `/api/v1/companies/${id}`)
                .status(StatusCode.CREATED)
                .json(result.value);
        }
    }

}
