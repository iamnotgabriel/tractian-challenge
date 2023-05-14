import {Request, Response} from "express";

export abstract class Route {

    protected abstract handle(req: Request, res: Response): Promise<void>;

    get handler(): Route["handle"] {
        return this.handle.bind(this);
    }

}