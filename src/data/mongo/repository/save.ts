import { Result, toOk } from "@/use-case/commons";
import { SaveRepository } from "@/use-case/commons/plugins";
import { MongoRepository } from "../mongo-repository";

export class SaveMongoRepository<R> extends MongoRepository implements SaveRepository<any, R> {
    
    async save(document: any): Promise<Result<R & { id: string; }>> {
        const result = await this.collection.insertOne(document);
        if(result.acknowledged) {
            return toOk(this.map(document));
        }

        return this.noAcknowledgment()
    }

}
