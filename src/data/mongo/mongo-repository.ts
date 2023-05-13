import { Entity } from "@/domain/commons/types";
import { WithId } from "mongodb";
import { ObjectId } from "mongodb";
import { Collection } from "mongodb";

export class MongoRepository {
    protected static readonly COLLECTION: string;
    constructor(protected readonly collection: Collection) {}

    protected map<T>(document: WithId<any>): T {
        const id  = document._id.toHexString();
        delete document._id;
        document.id = id;
        
        return document;
    }

}