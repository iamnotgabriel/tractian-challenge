import { Request, Response, Router } from "express";


export function registerRoute(router: Router) {
    router.all('*', notFoundRoute);
}

function notFoundRoute(req: Request, res: Response) {
    res.status(404).json({
        errorCode: 404,
        message: 'Resource Not Found',
        details: {
            method: req.method,
            path: req.path,
        }
    })
}