import express, { Express, Router } from "express";
import * as company from "./company";
import { cors } from "./middlewares/cors";
import { contentType } from "./middlewares/content-type";
import { bodyParser } from "./middlewares/body-parser";
import { ApplicationContext } from "@/main/context/application";
import { Configuration } from "@/main/context/configuration";
import { loggingMiddleware } from "./middlewares/logger";
import { logger } from "@/resources/logging";

export class WebAPI {
    public readonly app: Express;

    constructor(private readonly context: ApplicationContext, private readonly config: Configuration) {
        this.app = express()
    }

    setup() {
        this.registerMiddlewares();
        this.registerRoutes();
    }
    
    private registerMiddlewares() {
        this.app.use(bodyParser)
        this.app.use(cors)
        this.app.use(contentType);
        this.app.use(loggingMiddleware);
    }
    
    private registerRoutes(): void {
        const router  = Router();
        company.registerRoutes(router, this.context);
        this.app.use('/api/v1', router);
    }

    async start() {
        const {serverPort} = this.config;
        this.app.listen(serverPort, () =>
            logger.info(`Server running on port ${serverPort}`)
        );
    }
}