import { Router } from "express";
import { CreateCompanyRoute } from "./create";
import { ApplicationContext } from "@/main/context/application";


export function registerRoutes(router: Router, context: ApplicationContext): void {
    const create = new CreateCompanyRoute(context.createCompanyUseCase);

    router.post('/companies', create.handler)
}