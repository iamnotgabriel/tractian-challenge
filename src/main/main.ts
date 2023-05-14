import "module-alias/register";
import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { Configuration } from "./config";
import { WebAPI } from "@/api/web-api";
import { ApplicationContextLoader } from "./application-context/loader";

async function main() {
    const config = Configuration.get();
    await MongoClientSingleton.connect(config.mongoUrl);    
    const context = ApplicationContextLoader.get(); 
    const server = new WebAPI(context, config);
    server.setup();
    server.start();
}

main()
