import { Context } from "./context";


export class Configuration extends Context<Configuration> {
    public readonly mongoUrl: string;
    public readonly serverPort: number;

    static env() {
        return new Configuration({
            mongoUrl: process.env.MONGO_URL,
            serverPort: Number(process.env.serverPort),
        })
    }

    static local() {
        return new Configuration({
            mongoUrl: "mongodb://127.0.0.1:27017/db",
            serverPort: 8080,
        })
    }

    static get() {
        if(process.env.ENV) {
            return Configuration.env()
        }
        return Configuration.local();
    }
}