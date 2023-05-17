import { TestApplication } from "@/tests/main/test-application";
import { toErr, toOk } from "@/use-case/commons";
import request from "supertest";
import { Express } from "express";
import crypto from "crypto";
import { NotFoundError } from "@/domain/errors";

describe('api/user/read', () => {
    let app: Express;

    beforeAll(() => {
        const webApi = TestApplication.create();
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    test("reads user", async () => {
        const user = {
            id: '0as9df80a98f08089',
            name: 'API Testing user',
            email: 'tester@company.com',
            companyId: crypto.randomUUID(),
            createdAt: new Date(),
        };
        const id = '0as9df80a98f08089';
        TestApplication.context.readUserUseCase.handle.mockResolvedValueOnce(toOk(user));
        const response = await request(app).get('/api/v1/users/' + id).send().expect(200);
        const { body: res } = response;

        expect(TestApplication.context.readUserUseCase.handle).toBeCalledTimes(1);
        expect(res).toMatchObject({...user, createdAt: user.createdAt.toISOString()});
    });

    test("fails and returns error", async () => {
        const id  = crypto.randomUUID();
        TestApplication.context.readUserUseCase
            .handle.mockResolvedValueOnce(new NotFoundError('User', { id }).toResult());
        const { body: res } = await request(app).get('/api/v1/users/'+ id).send().expect(404);

        expect(res).toEqual({
            errorCode: 404 ,
            message: 'User Not Found',
            details: { id }
        })
    });

});
