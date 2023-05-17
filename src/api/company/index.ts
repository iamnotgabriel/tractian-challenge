import { Router } from "express";
import { CreateCompanyRoute } from "./create";
import { ApplicationContext } from "@/resources/context/application";
import { ReadCompanyRoute } from "./read";
import { DeleteCompanyRoute } from "./delete";
import { Route } from "../route";
import { UpdateCompanyRoute } from "./update";
import { ListCompanyRoute } from "./list";


export function registerRoutes(router: Router, context: ApplicationContext): void {
    Route.registerRoutes(router, [
        new CreateCompanyRoute(context.createCompanyUseCase),
        new ReadCompanyRoute(context.readCompanyUseCase),
        new DeleteCompanyRoute(context.deleteCompanyUseCase),
        new UpdateCompanyRoute(context.updateCompanyUseCase),
        new ListCompanyRoute(context.listCompanyUseCase),
    ]);
}
