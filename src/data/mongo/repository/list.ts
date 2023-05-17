import { Result, toOk } from "@/use-case/commons";
import { ListRepository } from "@/use-case/commons/plugins";
import { MongoRepository } from "../mongo-repository";
import { PageRequest } from "@/domain/commons/types";

export class ListMongoRepository<T> extends MongoRepository implements ListRepository<T> {
    
    async list(request: PageRequest): Promise<Result<T[]>> {
        const documents = await this.collection.aggregate([
            { "$sort": { [request.sort]: 1}},
            { "$skip": request.skip },
            { "$limit" : request.limit },
        ]).toArray();

        return toOk(this.mapAll(documents));
    }

    async countAll(): Promise<Result<number>> {
        const total = await this.collection.countDocuments();

        return toOk(total);
    }

}