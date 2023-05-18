import { Asset } from "@/domain/asset/entity";
import { FindByIdRepository, SaveRepository } from "../commons/plugins";
import { ValueObject } from "@/domain/commons/types";

export type FindAssetRepository = FindByIdRepository<Asset>;
export type SaveAssetRepository = SaveRepository<ValueObject<Asset>, Asset>;