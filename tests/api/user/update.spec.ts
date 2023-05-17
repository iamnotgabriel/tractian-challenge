import { TestApplication } from "@/tests/main/test-application";
import { toOk } from "@/use-case/commons";
import request from "supertest";
import { Express } from "express";
import { InternalError } from "@/domain/errors";

describe('api/user/update', () => {
    let app: Express;

    beforeAll(async () => {
        const webApi = await TestApplication.create();
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    test("update user", async () => {
        const user = {
            id: "0as9df80a98f08089",
            name: 'API Testing company',
            email: 'friendly_guy@email.com',
            companyId: '0as9df80a98f08089',
            createdAt: new Date()
        }
        const patch = {
            name: 'Friendly Guy'
        }

        TestApplication.context.updateUserUseCase
            .handle.mockResolvedValueOnce(toOk({...user, ...patch }));
        await request(app).patch('/api/v1/users/'+ user.id).send(patch).expect(200);
    });

    test("fails to update user", async () => {
        const user = {
            id: "0as9df80a98f08089",
            name: 'API Testing company',
            email: 'friendly_guy@email.com',
            companyId: '0as9df80a98f08089',
            createdAt: new Date()
        }
        const patch = {
            name: 'Friendly Guy'
        }

        TestApplication.context.updateUserUseCase
            .handle.mockResolvedValueOnce(new InternalError(new Error('not friendly server')).toResult());

        const { body: res} = await request(app)
            .patch('/api/v1/users/'+ user.id)
            .send(patch)
            .expect(500);

        expect(res).toMatchObject({
            errorCode: 500,
            message: 'Internal Error',
        });
    });
});
