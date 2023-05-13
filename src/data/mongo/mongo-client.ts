import { Collection, MongoClient } from "mongodb";

export class MongoClientSingleton {
    private static instance?: MongoClientSingleton;
    
    private constructor(private readonly client: MongoClient) {}

    public static async connect(uri: string): Promise<void> {
        if(MongoClientSingleton.instance != undefined) {
            MongoClientSingleton.disconnect();
        }
        const client = await MongoClient.connect(uri);
        MongoClientSingleton.instance = new MongoClientSingleton(client);
    }

    public static async disconnect() : Promise<void> {
        if (MongoClientSingleton.instance != undefined) {
            await MongoClientSingleton.instance.client.close();
        } 
    }

    public static getCollection(collectionName: string): Collection {
        if (MongoClientSingleton.instance == undefined) {
            throw new Error('Mongo connection not established')
        }
        return MongoClientSingleton.instance.client.db().collection(collectionName);
    }
}