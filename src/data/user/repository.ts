import { MongoRepository } from "../mongo/mongo-repository";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { FindUserRepository, SaveUserRepository } from "@/use-case/user/plugins";
import { PageRequest, ValueObject } from "@/domain/commons/types";
import { User } from "@/domain/user/entity";
import { Result } from "@/use-case/commons";
import { SaveMongoRepository } from "../mongo/repository/save";
import { ObjectId } from "mongodb";
import { FindMongoRepository } from "../mongo/repository/find";
import { DeleteByIdRepository, ListRepository, UpdateByIdRepository } from "@/use-case/commons/plugins";
import { DeleteMongoRepository } from "../mongo/repository/delete";
import { ListMongoRepository } from "../mongo/repository/list";
import { UpdateMongoRepository } from "../mongo/repository/update";

export class UserMongoRepository extends MongoRepository
    implements
        SaveUserRepository,
        FindUserRepository,
        DeleteByIdRepository,
        ListRepository<User>,
        UpdateByIdRepository<User>
{
    private readonly saveMongoRepository: SaveMongoRepository<User>; 
    private readonly findMongoRepository: FindMongoRepository<User>;
    private readonly deleteMongoRepository: DeleteMongoRepository;
    private readonly listMongoRepository: ListMongoRepository<User>;
    private readonly updateMongoRepository: UpdateMongoRepository<unknown>;

    constructor() {
        super(MongoClientSingleton.getCollection('users'));
        this.saveMongoRepository = new SaveMongoRepository(this.collection);
        this.findMongoRepository = new FindMongoRepository(this.collection);
        this.deleteMongoRepository = new DeleteMongoRepository(this.collection);
        this.listMongoRepository = new ListMongoRepository(this.collection);
        this.updateMongoRepository = new UpdateMongoRepository(this.collection);
    }

    save(entity: ValueObject<User>): Promise<Result<User>> {
        return this.saveMongoRepository.save({...entity, companyId: new ObjectId(entity.companyId)});
    }

    find(id: string): Promise<Result<User>> {
        return this.findMongoRepository.find(id);
    }

    delete(id: string): Promise<Result<void>> {
        return this.deleteMongoRepository.delete(id);
    }

    list(request: PageRequest): Promise<Result<User[]>> {
        return this.listMongoRepository.list(request);
    }

    countAll(): Promise<Result<number>> {
        return this.listMongoRepository.countAll();
    }

    update(request: UpdateByIdRepository.Request<User>): Promise<Result<void>> {
        return this.updateMongoRepository.update(request);
    }
}