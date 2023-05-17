import { Entity } from "../commons/types";

export enum AssetStatus {
    Running = "Running",
    Alerting = "Alerting",
    Stopped = "Stopped",
}

export type CreateAssetDTO = {
    image: string,
    name: string,
    description: string,
    model: string,
    assigneeId: string,
    status: AssetStatus,
    healthLevel: number,
    unitId: string,
};

export type Asset = Entity<CreateAssetDTO> & { companyId: string };
