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
}