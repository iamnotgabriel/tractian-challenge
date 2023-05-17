import { Company, CreateCompanyDTO } from "@/domain/company/entity";
import { Result } from "@/use-case/commons";
import { CreateCompanyUseCase } from "@/use-case/company/create-company";
import { Request, Router} from "express";
import { Route } from "@/api/route";
import { configuration } from "@/resources/context/configuration";
import { HttpResponse } from "../http/http-response";
import { CreateRoute } from "../route/create";

export class CreateCompanyRoute extends Route {
    
    private readonly createRoute: CreateRoute<CreateCompanyDTO, Company>;
    
    constructor(createUserUseCase: CreateCompanyUseCase) {
        super();
        this.createRoute = new CreateRoute(
            createUserUseCase,
            `${configuration.serverDomain}/api/v1/companies/:id`
        );
    }
    
    async handle(req: Request): Promise<Result<HttpResponse>> {
        const dto = req.body as CreateCompanyDTO;
        return this.createRoute.handle(dto);
    }
    
    public register(router: Router) {
        router.post('/companies', this.handler);
    }
}
