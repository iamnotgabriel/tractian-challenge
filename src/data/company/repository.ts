import { Company, CreateCompanyDTO } from "@/domain/company/entity";
import { DeleteCompanyRepository, FindCompanyRepository, ListCompanyRepository, SaveCompanyRepository, UpdateCompanyRepository } from "@/use-case/company/plugins";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { MongoRepository } from "../mongo/mongo-repository";
import { Result } from "@/use-case/commons";
import { InternalError } from "@/domain/errors";
import { PageRequest, ValueObject } from "@/domain/commons/types";
import { UpdateByIdRepository } from "@/use-case/commons/plugins";
import { SaveMongoRepository } from "../mongo/repository/save";
import { FindMongoRepository } from "../mongo/repository/find";
import { UpdateMongoRepository } from "../mongo/repository/update";
import { DeleteMongoRepository } from "../mongo/repository/delete";
import { ListMongoRepository } from "../mongo/repository/list";
import { MongoEntityRepository } from "../mongo/mongo-entity-repository";


function noAcknowledgment() {
    return new InternalError(new Error('No acknowledgment received')).toResult();
}

export class CompanyMongoRepository extends MongoEntityRepository<Company> {

    protected readonly saveRepository: SaveMongoRepository<Company>;

    constructor() {
        super(MongoClientSingleton.getCollection('companies'));
    }

}