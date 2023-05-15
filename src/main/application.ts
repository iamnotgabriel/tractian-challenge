import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { Configuration } from "./context/configuration";
import { WebAPI } from "@/api/web-api";
import { ApplicationContext } from "./context/application";

export class Application {

    private server: WebAPI

    constructor(private readonly config: Configuration, private readonly context: ApplicationContext) {
        this.server = new WebAPI(context, config)
    }

    async start() {
        this.setup();
        this.server.start();
    }

    private setup() {
        this.server.setup();
    }

    async teardown() {
        await MongoClientSingleton.disconnect();
    }
}