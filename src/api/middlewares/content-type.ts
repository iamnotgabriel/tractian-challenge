import { NextFunction, Response, Request } from "express";

export function contentType(req: Request, res: Response, next: NextFunction): void {
    res.type('json');
    next()
}