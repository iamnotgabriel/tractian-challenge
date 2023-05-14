import { CreateCompanyDTO } from "@/domain/company/entity";
import { Result } from "@/use-case/commons";
import { CreateCompanyUseCase } from "@/use-case/company/create-company";
import {Request, Response} from "express";
import { Route } from "../route";

export class CreateCompanyRoute extends Route {

    constructor(private readonly useCase: CreateCompanyUseCase) {
        super();
    }

    protected async handle(req: Request, res: Response): Promise<void> {
        const body = req.body as CreateCompanyDTO;
        const result = await this.useCase.create(body);
        if (!result.ok) {
            const error  = (result as Result.Err).error;
            res.status(error.errorCode).json(error.toJson())
        } else {
            const { id } = result.value;
            res.json(result.value).setHeader('location', `/companies/${id}`);
        }
    }

}
