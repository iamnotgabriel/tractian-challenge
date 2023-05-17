import { TestApplication } from "@/tests/main/test-application";
import { toOk } from "@/use-case/commons";
import request from "supertest";
import { Express } from "express";
import { InternalError } from "@/domain/errors";

describe('api/user/list', () => {
    let app: Express;
    const userPage ={
        data: [{
            id: "0as9df80a98f08089",
            name: 'API Testing startup owner',
            email: 'owner@testing_startup.com',
            companyId: '0as9df80a98f08089',
            createdAt: new Date()
        }],
        total: 10
    };
    beforeAll(async () => {
        const webApi = await TestApplication.create();
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("list users", async () => {
        TestApplication.context.listUserUseCase
            .handle.mockResolvedValueOnce(toOk(userPage));
        const res = await request(app).get('/api/v1/users')
            .send().expect(200);

        const expectedBody = {
            total: userPage.total,
            data: userPage.data.map(company => ({...company, createdAt: company.createdAt.toISOString()}))
        }
        expect(TestApplication.context.listUserUseCase.handle).toBeCalledTimes(1);
        expect(res.body).toMatchObject(expectedBody);
    });

    test("fails page request validation", async () => {
        const res = await request(app).get('/api/v1/users')
            .query('limit=-10')
            .send()
            .expect(400);

        expect(TestApplication.context.listUserUseCase.handle).toBeCalledTimes(0);
        expect(res.body).toMatchObject({
            errorCode: 400,
            message: 'Validation Error',
            details: expect.arrayContaining([
                expect.objectContaining({
                    message: '"limit" must be greater than or equal to 1'
                })
            ])
        });
    });

    test("list companies route finds nothing", async () => {
        TestApplication.context.listUserUseCase
            .handle.mockResolvedValueOnce(new InternalError(new Error('core dumped')).toResult());
        await request(app)
            .get('/api/v1/users')
            .send()
            .expect(500);
        
    });
});
