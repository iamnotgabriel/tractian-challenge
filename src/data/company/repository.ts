import { Company } from "@/domain/company/entity";
import { DeleteCompanyRepository, FindCompanyRepository, SaveCompanyRepository, UpdateCompanyRepository } from "@/use-case/company/plugins";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { MongoRepository } from "../mongo/mongo-repository";
import { ObjectId } from "mongodb";
import { Result, toOk } from "@/use-case/commons";
import { InternalError, NotFoundError } from "@/domain/errors";


function noAcknowledgment() {
    return new InternalError(new Error('No acknowledgment received')).toResult();
}

export class CompanyMongoRepository extends MongoRepository
    implements
        SaveCompanyRepository,
        FindCompanyRepository,
        DeleteCompanyRepository,
        UpdateCompanyRepository {
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

        return noAcknowledgment()
    }

    async update({id, patch}: UpdateCompanyRepository.Request): Promise<UpdateCompanyRepository.Response> {
        const result  = await this.collection.updateOne(
            { _id: new ObjectId(id )},
            {"$set": patch}, 
            { upsert: false }
        );
        if (result.acknowledged && result.modifiedCount > 0) {
            return toOk(null);
        }
        if (result.acknowledged && result.matchedCount == 0) {
            return new NotFoundError('company', {id}).toResult();
        }

        return noAcknowledgment();
    }

    async delete(id: string): Promise<DeleteCompanyRepository.Response> {
        const result = await this.collection.deleteOne({_id: new ObjectId(id)})
        if (result.acknowledged) {
            return toOk(null);
        }

        return noAcknowledgment();
    }

}