import { TestApplication } from "@/tests/main/test-application";
import { toOk } from "@/use-case/commons";
import request from "supertest";;
import { Express } from "express";

describe('api/company/read', () => {
    let app: Express;

    beforeAll(() => {
        const webApi = TestApplication.create();
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    test("read company route", async () => {
        const company = {
            id: "0as9df80a98f08089",
            name: 'API Testing company',
            document: '09876543210',
            createdAt: new Date()
        }
        TestApplication.context.readCompanyUseCase.find.mockResolvedValueOnce(toOk(company));
        const res = await request(app).get('/api/v1/companies/'+ company.id).send().expect(200);
        
        expect(res.body).toMatchObject({
            ...company,
            createdAt: company.createdAt.toISOString()
        });
    });
});
