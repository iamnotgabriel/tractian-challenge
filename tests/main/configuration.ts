import { Configuration } from "@/main/context/configuration";

export const testConfiguration: Configuration = {
    mongoUrl: process.env.MONGO_URL,
    serverPort: 0
}