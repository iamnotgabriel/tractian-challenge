import { Application } from "@/main/application";
import { getTestContext } from "./context";
import { WebAPI } from "@/api/web-api";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { configuration } from "@/main/context/configuration";


export class TestApplication {
    public readonly app: Application;

    static readonly context = getTestContext();

    static create(): WebAPI {
        MongoClientSingleton.connect(configuration.mongoUrl);
        const api  = new WebAPI(TestApplication.context, configuration);
        api.setup();

        return api;
    }
    static async teardown(): Promise<void> {
        await MongoClientSingleton.disconnect();
    }
}