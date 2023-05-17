import { User } from "@/domain/user/entity";
import { FindByIdRepository, SaveRepository } from "../commons/plugins";
import { ValueObject } from "@/domain/commons/types";

export type FindUserRepository = FindByIdRepository<User>;
export type SaveUserRepository = SaveRepository<ValueObject<User>, User>;
