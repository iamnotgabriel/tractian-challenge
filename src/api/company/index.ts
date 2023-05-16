import { Router } from "express";
import { CreateCompanyRoute } from "./create";
import { ApplicationContext } from "@/resources/context/application";
import { ReadCompanyRoute } from "./read";
import { DeleteCompanyRoute } from "./delete";
import { Route } from "../route";
import { UpdateCompanyRoute } from "./update";


export function registerRoutes(router: Router, context: ApplicationContext): void {
    const routes: Route[] = [
        new CreateCompanyRoute(context.createCompanyUseCase),
        new ReadCompanyRoute(context.readCompanyUseCase),
        new DeleteCompanyRoute(context.deleteCompanyUseCase),
        new UpdateCompanyRoute(context.updateCompanyUseCase),
    ];
    
    routes.forEach(route => route.register(router));
}
