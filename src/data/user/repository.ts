import { MongoClientSingleton } from "../mongo/mongo-client";
import { SaveUserRepository } from "@/use-case/user/plugins";
import { ValueObject } from "@/domain/commons/types";
import { User } from "@/domain/user/entity";
import { Result } from "@/use-case/commons";

import { ObjectId } from "mongodb";
import { MongoEntityRepository } from "../mongo/mongo-entity-repository";

export class UserMongoRepository extends MongoEntityRepository<User>
    implements
        SaveUserRepository {

    constructor() {
        super(MongoClientSingleton.getCollection('users'));
    }

    save(entity: ValueObject<User>): Promise<Result<User>> {
        return this.saveMongoRepository.save({...entity, companyId: new ObjectId(entity.companyId)});
    }
}