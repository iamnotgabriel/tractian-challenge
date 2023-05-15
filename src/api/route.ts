import { Result } from "@/use-case/commons";
import {Request, Response, Router} from "express";

export type UseCaseCallback<T> =() => Promise<Result<T>>;
export type ResponseCallback<T> = (result: T) => void; 


export abstract class Route {

    abstract handle(req: Request, res: Response): Promise<void>;

    protected get handler(): Route["handle"] {
        return this.handle.bind(this);
    }
    
    protected static respondWithError(res: Response, {error}: Result.Err): void {
        res.status(error.errorCode).json(error.toJson())
    }

    abstract register(router: Router);
}