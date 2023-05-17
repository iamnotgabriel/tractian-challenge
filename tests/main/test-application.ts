import { Application } from "@/main/application";
import { TestApplicationContext, getTestContext } from "./context";
import { WebAPI } from "@/api/web-api";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { configuration } from "@/resources/context/configuration";
import { ApplicationContext } from "@/resources/context/application";


export class TestApplication {
    public readonly app: Application;

    public static context: TestApplicationContext;

    static async create(context: () => ApplicationContext = getTestContext): Promise<WebAPI> {
        await MongoClientSingleton.connect(configuration.mongoUrl);
        TestApplication.context = context() as TestApplicationContext;
        const api  = new WebAPI(TestApplication.context);
        api.setup();

        return api;
    }

    static async teardown(): Promise<void> {
        await MongoClientSingleton.disconnect();
    }
}