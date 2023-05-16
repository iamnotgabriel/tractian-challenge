import { PageRequest, UpdateObject } from "@/domain/commons/types";
import { Result } from "../commons";

export interface FindByIdRepository<T> {
    find(id: string): Promise<Result<T | null>>
}

export interface SaveRepository<T, R> {
    save(company: T) : Promise<Result<R>>
}

export interface DeleteByIdRepository {
    delete(id: string): Promise<Result<void>>
}

export interface UpdateByIdRepository<T> {
    update(request: UpdateByIdRepository.Request<T>): Promise<UpdateByIdRepository.Response>
}

export namespace UpdateByIdRepository {
    export type Request<T> = {
        id: string,
        patch: UpdateObject<T>,
    };
    export type Response = Result<void>;
}

export interface ListRepository<T> {
    list(request: PageRequest): Promise<Result<T[]>>;
    countAll(): Promise<Result<number>>;
}
