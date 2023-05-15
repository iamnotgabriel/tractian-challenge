import { Application } from "@/main/application";
import { testConfiguration } from "./configuration";
import { getTestContext } from "./context";
import { WebAPI } from "@/api/web-api";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { setConfiguration } from "@/main/context/configuration";
import { logger } from "@/resources/logging";



export class TestApplication {
    public readonly app: Application;

    static readonly context = getTestContext();

    static create(): WebAPI {
        setConfiguration(testConfiguration);
        MongoClientSingleton.connect(testConfiguration.mongoUrl);
        const api  = new WebAPI(TestApplication.context, testConfiguration);
        api.setup();

        return api;
    }

    static disableLogging() {
        logger.silent = true;
    }

    static async teardown(): Promise<void> {
        await MongoClientSingleton.disconnect();
    }
}