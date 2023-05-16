import { configuration } from "@/resources/context/configuration";
import { getLogger } from "@/resources/logging";
import { NextFunction, Request, Response } from "express";

const logger  = getLogger('HTTP');

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    if (configuration.httpLogging) {
        logger.info(`${req.method} ${req.path}`);
    }
    next();
}
