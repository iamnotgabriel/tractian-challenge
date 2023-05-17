import { TestApplication } from "@/tests/main/test-application";
import { toOk } from "@/use-case/commons";
import request from "supertest";
import { Express } from "express";
import crypto from "crypto";

describe('api/user/create', () => {
    let app: Express;

    beforeAll(() => {
        const webApi = TestApplication.create();
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    test("create companyUseCase", async () => {
        const body = {
            name: 'API Testing user',
            email: 'tester@company.com',
            companyId: crypto.randomUUID(),
        }
        TestApplication.context.createUserUseCase.handle.mockResolvedValueOnce(toOk({
            ...body,
            id: "0as9df80a98f08089",
            createdAt: new Date()
        }));
        const response = await request(app).post('/api/v1/users').send(body).expect(201);
        const { id } = response.body;
        
        const contentLocation =  `http://localhost:8080/api/v1/users/${id}`;

        expect(response.headers['content-location']).toBe(contentLocation);
    });
});
