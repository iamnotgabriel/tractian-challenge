import { MongoRepository } from "../mongo/mongo-repository";
import { MongoClientSingleton } from "../mongo/mongo-client";
import { SaveUserRepository } from "@/use-case/user/plugins";
import { ValueObject } from "@/domain/commons/types";
import { User } from "@/domain/user/entity";
import { Result } from "@/use-case/commons";
import { SaveMongoRepository } from "../mongo/repository/save";
import { ObjectId } from "mongodb";

export class UserMongoRepository extends MongoRepository
    implements SaveUserRepository
{
    private readonly saveMongoRepository: SaveMongoRepository<User>; 

    constructor() {
        super(MongoClientSingleton.getCollection('users'));
        this.saveMongoRepository = new SaveMongoRepository(this.collection);
        
    }

    save(entity: ValueObject<User>): Promise<Result<User>> {
        return this.saveMongoRepository.save({...entity, companyId: new ObjectId(entity.companyId)});
    }
}