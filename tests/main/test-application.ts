import { Application } from "@/main/application";
import { testConfiguration } from "./configuration";
import { getTestContext } from "./context";
import { WebAPI } from "@/api/web-api";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";


export class TestApplication {
    public readonly app: Application;

    static readonly context = getTestContext();

    static create(): WebAPI {
        MongoClientSingleton.connect(testConfiguration.mongoUrl);
        const api  = new WebAPI(TestApplication.context, testConfiguration);
        api.setup();

        return api;
    }

    static async teardown(): Promise<void> {
        await MongoClientSingleton.disconnect();
    }
}