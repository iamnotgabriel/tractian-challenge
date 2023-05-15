import { Router } from "express";
import { CreateCompanyRoute } from "./create";
import { ApplicationContext } from "@/main/context/application";
import { ReadCompanyRoute } from "./read";


export function registerRoutes(router: Router, context: ApplicationContext): void {
    const basePath = '/companies';
    const create = new CreateCompanyRoute(context.createCompanyUseCase);
    const read = new ReadCompanyRoute(context.readCompanyUseCase);
    create.register(router);
    read.register(router);
}
