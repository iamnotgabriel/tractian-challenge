import { Router } from "express";
import { CreateCompanyRoute } from "./create";
import { ApplicationContext } from "@/main/application-context";


export function registerRoutes(router: Router, context: ApplicationContext): void {
    const create = new CreateCompanyRoute(context.createCompanyUseCase);

    router.post('/companies', create.handler)
}