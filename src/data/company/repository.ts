import { Company, CreateCompanyDTO } from "@/domain/company/entity";
import { DeleteCompanyRepository, FindCompanyRepository, ListCompanyRepository, SaveCompanyRepository, UpdateCompanyRepository } from "@/use-case/company/plugins";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { MongoRepository } from "../mongo/mongo-repository";
import { ObjectId } from "mongodb";
import { Result, toOk } from "@/use-case/commons";
import { InternalError, NotFoundError } from "@/domain/errors";
import { PageRequest, UpdateObject } from "@/domain/commons/types";
import { DeleteByIdRepository, UpdateByIdRepository } from "@/use-case/commons/plugins";
import { SaveMongoRepository } from "../mongo/save-repository";
import { FindMongoRepository } from "../mongo/find-repository";
import { UpdateMongoRepository } from "../mongo/update-repository";
import { DeleteMongoRepository } from "../mongo/delete-repository";


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

    private readonly saveRepository: SaveMongoRepository<CreateCompanyDTO, Company>;
    private readonly findRepository: FindMongoRepository<Company>;
    private readonly updateRepository: UpdateMongoRepository<Company>;
    private readonly deleteRepository: DeleteMongoRepository;

    constructor() {
        super(MongoClientSingleton.getCollection('companies'));

        this.saveRepository = new SaveMongoRepository(this.collection)
        this.findRepository = new FindMongoRepository(this.collection)
        this.updateRepository = new UpdateMongoRepository(this.collection)
        this.deleteRepository = new DeleteMongoRepository(this.collection)
    }

    async find(id: string): Promise<Result<Company>> {
        return this.findRepository.find(id);
    }

    async save(document: CreateCompanyDTO): Promise<Result<Company>> {
        return this.saveRepository.save(document);
    }

    async update(request: UpdateByIdRepository.Request<Company>): Promise<UpdateByIdRepository.Response> {
        return this.updateRepository.update(request);
    }

    async delete(id: string): Promise<Result<void>> {
        return this.deleteRepository.delete(id);
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