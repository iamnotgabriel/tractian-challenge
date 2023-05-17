import { Router } from "express";
import { Route } from "../route";
import { ApplicationContext } from "@/resources/context/application";
import { CreateUnitRoute } from "./create";
import { ReadUnitRoute } from "./read";
import { DeleteUnitRoute } from "./delete";



export function registerRoutes(router: Router, context: ApplicationContext) {
    Route.registerRoutes(router, [
        new CreateUnitRoute(context.createUnitUseCase),
        new ReadUnitRoute(context.readUnitUseCase),
        new DeleteUnitRoute(context.deleteUnitUseCase),
    ]);
}