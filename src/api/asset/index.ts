import { ApplicationContext } from "@/resources/context/application";
import { Router } from "express";
import { Route } from "../route";
import { CreateAssetRoute } from "./create";

export function registerRoutes(router: Router, context: ApplicationContext) {
    Route.registerRoutes(router, [
        new CreateAssetRoute(context.createAssetUseCase),
    ]);
}
