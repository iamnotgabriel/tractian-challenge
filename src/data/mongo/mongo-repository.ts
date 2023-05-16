import { WithId } from "mongodb";
import { Collection } from "mongodb";

export class MongoRepository {
    constructor(protected readonly collection: Collection) {}

    protected map<T>(document: WithId<any>): T {
        const id  = document._id.toHexString();
        delete document._id;
        document.id = id;

        return document;
    }

    protected mapAll<T>(documents: WithId<any>[]): T[] {
        return  documents.map(this.map.bind(this));
    }

}