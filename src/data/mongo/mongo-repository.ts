import { InternalError } from "@/domain/errors";
import { ObjectId, WithId } from "mongodb";
import { Collection } from "mongodb";

export class MongoRepository {
    constructor(protected readonly collection: Collection) {}

    protected map<T>(document: WithId<any>): T {
        const id = document._id.toHexString();
        delete document._id;
        document.id = id;
        this.mapObjectKeysToString(document)
       
        return document;
    }

    private mapObjectKeysToString(document: any) {
        for(const key of Object.keys(document)) {
            if (document[key] instanceof ObjectId) {
                const id = document[key].toHexString();
                delete document[key];
                document[key] = id;
            }
        }
    }

    protected mapAll<T>(documents: WithId<any>[]): T[] {
        return  documents.map(this.map.bind(this));
    }
    
    protected noAcknowledgment() {
        return new InternalError(new Error('No acknowledgment received')).toResult();
    }
    

}