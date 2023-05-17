import { Result } from "@/use-case/commons";
import { Request, Response, Router } from "express";
import { HttpResponse } from "../http/http-response";
import { getLogger } from "@/resources/logging";

export type UseCaseCallback<T> =() => Promise<Result<T>>;
export type ResponseCallback<T> = (result: T) => void; 


const logger = getLogger('HTTP');

export abstract class Route {
    abstract handle(req: Request): Promise<Result<HttpResponse>>;

    protected get handler() {
        return async (req: Request, res: Response) => {
            const result = await this.handle(req);
            if (result.ok) {
                const { value } = result;
                res.status(value.status);
                this.setHeaders(res, value.headers);
                res.json(value.body);
            } else  { 
                const error = (result as Result.Err).error;
                logger.warn(`${req.method} ${req.path} error=${error.message}`);
                res.status(error.errorCode).json(error.toJson());
            }
        }
    }

    private setHeaders (res: Response, headers: HttpResponse['headers']) {
        if(headers) {
            for (const header in headers) {
                res.setHeader(header, headers[header]);
            }
        }
    }

    abstract register(router: Router);


    static registerRoutes(router: Router, routes: Route[]) {
        routes.forEach(route => route.register(router))
    }
}