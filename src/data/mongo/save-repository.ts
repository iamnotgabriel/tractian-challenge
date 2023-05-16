import { Result, toOk } from "@/use-case/commons";
import { SaveRepository } from "@/use-case/commons/plugins";
import { MongoRepository } from "./mongo-repository";

export class SaveMongoRepository<T, R> extends MongoRepository implements SaveRepository<T, R> {
    
    async save(document: T): Promise<Result<R & { id: string; }>> {
        const result = await this.collection.insertOne(document);
        if(result.acknowledged) {
            return toOk(this.map(document));
        }

        return this.noAcknowledgment()
    }

}
