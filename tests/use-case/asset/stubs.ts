import { Asset, AssetStatus } from "@/domain/asset/entity";
import { FindByIdRepository, SaveRepository, UpdateByIdRepository } from "../commons/plugins";
import { ValueObject } from "@/domain/commons/types";
import crypto from "crypto";
import { randomId } from "@/tests/commons";

export type AssetRepository = 
    & jest.Mocked<SaveRepository<ValueObject<Asset>, Asset>>
    & jest.Mocked<FindByIdRepository<Asset>>
    & jest.Mocked<UpdateByIdRepository<Asset>>;

export const assetRepository: AssetRepository = {
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
};

export const asset: Asset = {
    id: randomId(),
    name: 'Great Motor',
    image: "http://image.com/path/to/image.png",
    description: "gOld but great motor",
    model: "great-motor-is-a-unique-model",
    assigneeId: randomId(),
    status: AssetStatus.Running,
    healthLevel: 0,
    unitId: randomId(),
    createdAt: new Date(),
    companyId: randomId(),
};