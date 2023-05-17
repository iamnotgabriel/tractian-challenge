import { Router } from "express";
import { Route } from "../route";
import { ApplicationContext } from "@/resources/context/application";
import { CreateUnitRoute } from "./create";



export function registerRoutes(router: Router, context: ApplicationContext) {
    Route.registerRoutes(router, [
        new CreateUnitRoute(context.createUnitUseCase)
    ]);
}