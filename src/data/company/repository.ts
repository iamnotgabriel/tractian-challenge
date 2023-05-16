import { Company, CreateCompanyDTO } from "@/domain/company/entity";
import { DeleteCompanyRepository, FindCompanyRepository, ListCompanyRepository, SaveCompanyRepository, UpdateCompanyRepository } from "@/use-case/company/plugins";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { MongoRepository } from "../mongo/mongo-repository";
import { ObjectId } from "mongodb";
import { Result, toOk } from "@/use-case/commons";
import { InternalError, NotFoundError } from "@/domain/errors";
import { PageRequest, UpdateObject } from "@/domain/commons/types";
import { UpdateByIdRepository } from "@/use-case/commons/plugins";


function noAcknowledgment() {
    return new InternalError(new Error('No acknowledgment received')).toResult();
}

export class CompanyMongoRepository extends MongoRepository
    implements
        SaveCompanyRepository,
        FindCompanyRepository,
        DeleteCompanyRepository,
        UpdateCompanyRepository,
        ListCompanyRepository
    {

    constructor() {
        super(MongoClientSingleton.getCollection('companies'))
    }

    async find(id: string): Promise<Result<Company>> {
        const company = await this.collection.findOne({_id: new ObjectId(id)});
        if (company == null) {
            return toOk(null);
        }
        return toOk(this.map<Company>(company));
    }

    async save(document: CreateCompanyDTO): Promise<Result<Company>> {
        const result = await this.collection.insertOne(document);
        if(result.acknowledged) {
            return toOk(this.map(document));
        }

        return noAcknowledgment()
    }

    async update({id, patch}: UpdateByIdRepository.Request<Company>): Promise<UpdateByIdRepository.Response> {
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

    async delete(id: string): Promise<Result<void>> {
        const result = await this.collection.deleteOne({_id: new ObjectId(id)})
        if (result.acknowledged) {
            return toOk(null);
        }

        return noAcknowledgment();
    }

    async list(request: PageRequest): Promise<Result<Company[]>> {
        const cursor =  this.collection.find();
        cursor.sort(request.sort, 'asc');
        cursor.limit(request.limit);
        cursor.skip(request.skip);
        const entities = this.mapAll<Company>(await cursor.toArray());

        return toOk(entities);
    }

    async countAll(): Promise<Result<number>> {
        const total = await this.collection.countDocuments();

        return toOk(total);
    }


}