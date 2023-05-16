import "module-alias/register";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { configuration } from "./context/configuration";
import { Application } from "./application";
import { getContext } from "./context/application";

async function main() {
    await MongoClientSingleton.connect(configuration.mongoUrl);    
    const app = new Application(getContext());
    try {
        await app.start()
    } catch {
        await app.teardown();
    }
}

main()
