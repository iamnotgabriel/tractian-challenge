import { Company } from "@/domain/company/entity";
import { SaveCompanyRepository } from "@/use-case/company/plugins";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { MongoRepository } from "../mongo/mongo-repository";
import { ObjectId } from "mongodb";
import { Result, toOk } from "@/use-case/commons";
import { InternalError } from "@/domain/errors";

export class CompanyMongoRepository extends MongoRepository implements SaveCompanyRepository {
    constructor() {
        super(MongoClientSingleton.getCollection('companies'))
    }

    async save(document: SaveCompanyRepository.Request): Promise<Result<Company>> {
        const result = await this.collection.insertOne(document);
        if(result.acknowledged) {
            return toOk(this.map(document));
        }
        return new InternalError(new Error('No Acknowledgment received')).toResult() as Result.Err;
    }

    async findOne(id: string): Promise<Company> {
        const result = await this.collection.findOne({_id: new ObjectId(id)});

        return this.map(result);
    }
}