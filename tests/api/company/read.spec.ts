import { TestApplication } from "@/tests/main/test-application";
import { toOk } from "@/use-case/commons";
import request from "supertest";
import { Express } from "express";
import { NotFoundError } from "@/domain/errors";

describe('api/company/read', () => {
    let app: Express;
    const company = {
        id: "0as9df80a98f08089",
        name: 'API Testing company',
        document: '09876543210',
        createdAt: new Date()
    }

    beforeAll(async () => {
        const webApi = await TestApplication.create();
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    test("read company route finds company", async () => {
        TestApplication.context.readCompanyUseCase
            .handle.mockResolvedValueOnce(toOk(company));
        const res = await request(app).get('/api/v1/companies/'+ company.id)
            .send().expect(200);
        
        expect(res.body).toMatchObject({
            ...company,
            createdAt: company.createdAt.toISOString()
        });
    });

    test("read company route does not find company", async () => {
        TestApplication.context.readCompanyUseCase
            .handle.mockResolvedValueOnce(new NotFoundError('Company', {id: company.id}).toResult());
        const res = await request(app)
            .get('/api/v1/companies/'+ company.id)
            .send()
            .expect(404);
        
        expect(res.body).toMatchObject({
            errorCode: 404,
            message: "Company Not Found",
            details: {
                id: company.id
            }
        });
    });
});
