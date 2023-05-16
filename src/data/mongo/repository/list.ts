import { Result, toOk } from "@/use-case/commons";
import { ListRepository } from "@/use-case/commons/plugins";
import { MongoRepository } from "../mongo-repository";
import { PageRequest } from "@/domain/commons/types";

export class ListMongoRepository<T> extends MongoRepository implements ListRepository<T> {
    
    async list(request: PageRequest): Promise<Result<T[]>> {
        const cursor =  this.collection.find();
        cursor.sort(request.sort, 'asc');
        cursor.limit(request.limit);
        cursor.skip(request.skip);
        const entities = this.mapAll<T>(await cursor.toArray());

        return toOk(entities);
    }

    async countAll(): Promise<Result<number>> {
        const total = await this.collection.countDocuments();

        return toOk(total);
    }

}