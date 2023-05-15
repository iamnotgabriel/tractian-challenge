import { Company } from "@/domain/company/entity";
import { DeleteCompanyRepository, FindCompanyRepository, SaveCompanyRepository, UpdateCompanyRepository } from "@/use-case/company/plugins";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { MongoRepository } from "../mongo/mongo-repository";
import { ObjectId } from "mongodb";
import { Result, toOk } from "@/use-case/commons";
import { InternalError } from "@/domain/errors";

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

        return new InternalError(new Error('No acknowledgment received')).toResult();
    }

    async update(id: UpdateCompanyRepository.Request): Promise<UpdateCompanyRepository.Response> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<DeleteCompanyRepository.Response> {
        const result = await this.collection.deleteOne({_id: new ObjectId(id)})
        if (result.acknowledged) {
            return toOk(null);
        }
        return new InternalError(new Error('No acknowledgment received')).toResult();
    }

}