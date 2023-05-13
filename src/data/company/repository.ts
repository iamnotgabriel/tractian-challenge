import { Company } from "@/domain/company/entity";
import { SaveCompanyRepository } from "@/use-case/company/plugins";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { MongoRepository } from "../mongo/mongo-repository";
import { ObjectId } from "mongodb";

export class CompanyMongoRepository extends MongoRepository implements SaveCompanyRepository {
    constructor() {
        super(MongoClientSingleton.getCollection('companies'))
    }

    async save(document: SaveCompanyRepository.Request): Promise<Company> {
        await this.collection.insertOne(document);
        
        return this.map(document);
    }

    async findOne(id: string): Promise<Company> {
        const result = await this.collection.findOne({_id: new ObjectId(id)});

        return this.map(result);
    }
}