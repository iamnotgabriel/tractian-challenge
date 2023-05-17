import { Unit } from "@/domain/unit/entity";
import { FindByIdRepository, SaveRepository } from "../commons/plugins";
import { ValueObject } from "@/domain/commons/types";

export type FindUserRepository = FindByIdRepository<Unit>;
export type SaveUnitRepository = SaveRepository<ValueObject<Unit>, Unit>;
