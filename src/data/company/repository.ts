import { Company } from "@/domain/company/entity";
import { FindCompanyRepository, SaveCompanyRepository } from "@/use-case/company/plugins";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { MongoRepository } from "../mongo/mongo-repository";
import { ObjectId } from "mongodb";
import { Result, toOk } from "@/use-case/commons";
import { InternalError } from "@/domain/errors";

export class CompanyMongoRepository extends MongoRepository implements SaveCompanyRepository, FindCompanyRepository {
    constructor() {
        super(MongoClientSingleton.getCollection('companies'))
    }

    async find(id: string): Promise<FindCompanyRepository.Response> {
        const company = await this.collection.findOne({_id: new ObjectId(id)});
        if (company == null) {
            return toOk(null);
        }
        return toOk(this.map(company));
    }

    async save(document: SaveCompanyRepository.Request): Promise<Result<Company>> {
        const result = await this.collection.insertOne(document);
        if(result.acknowledged) {
            return toOk(this.map(document));
        }

        return new InternalError(new Error('No Acknowledgment received')).toResult() as Result.Err;
    }

}