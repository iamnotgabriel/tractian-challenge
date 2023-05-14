import { MongoClientSingleton } from "@/data/mongo/mongo-client";
import { Configuration } from "./config";
import { WebAPI } from "@/api/web-api";
import { ApplicationContextLoader } from "./application-context/loader";


const config = Configuration.env();

MongoClientSingleton.connect(config.mongoUrl)
    .then(() => {
        const context = ApplicationContextLoader.get(); 
        const server = new WebAPI(context, config);
        server.setup();
        server.start();
    })