import { ApplicationContext } from "@/resources/context/application";
import { Router } from "express";
import { Route } from "../route";
import { CreateUserRoute } from "./create";
import { ReadUserRoute } from "./read";
import { DeleteUserRoute } from "./delete";

export function registerRoutes(router: Router, context: ApplicationContext): void {
    const routes: Route[] = [
        new CreateUserRoute(context.createUserUseCase),
        new ReadUserRoute(context.readUserUseCase),
        new DeleteUserRoute(context.deleteUserUseCase),
    ];
    
    routes.forEach(route => route.register(router));
}