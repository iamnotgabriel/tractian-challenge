import { Router } from "express";
import { CreateCompanyRoute } from "./create";
import { ApplicationContext } from "@/main/context/application";
import { ReadCompanyRoute } from "./read";
import { DeleteCompanyRoute } from "./delete";
import { Route } from "../route";


export function registerRoutes(router: Router, context: ApplicationContext): void {
    const routes: Route[] = [
        new CreateCompanyRoute(context.createCompanyUseCase),
        new ReadCompanyRoute(context.readCompanyUseCase),
        new DeleteCompanyRoute(context.deleteCompanyUseCase),
    ]
    
    routes.forEach(route => route.register(router));
}
