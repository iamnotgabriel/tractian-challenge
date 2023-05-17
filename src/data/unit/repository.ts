import { MongoClientSingleton } from "../mongo/mongo-client";
import { SaveUnitRepository } from "@/use-case/unit/plugins";
import { ValueObject } from "@/domain/commons/types";
import { Unit } from "@/domain/unit/entity";
import { Result } from "@/use-case/commons";

import { ObjectId } from "mongodb";
import { MongoEntityRepository } from "../mongo/mongo-entity-repository";

export class UnitMongoRepository extends MongoEntityRepository<Unit>
    implements
        SaveUnitRepository {

    constructor() {
        super(MongoClientSingleton.getCollection('units'));
    }

    save(entity: ValueObject<Unit>): Promise<Result<Unit>> {
        return this.saveMongoRepository.save({...entity, companyId: new ObjectId(entity.companyId)});
    }
}