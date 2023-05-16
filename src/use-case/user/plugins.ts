import { User } from "@/domain/user/entity";
import { FindByIdRepository } from "../commons/plugins";

export type FindUserRepository = FindByIdRepository<User>;
