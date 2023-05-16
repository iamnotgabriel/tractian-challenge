import { TestApplication } from "@/tests/main/test-application";
import { toOk } from "@/use-case/commons";
import request from "supertest";
import { Express } from "express";
import { NotFoundError } from "@/domain/errors";

describe('api/company/list', () => {
    let app: Express;
    const companyPage ={
        data: [{
            id: "0as9df80a98f08089",
            name: 'API Testing company',
            document: '09876543210',
            createdAt: new Date()
        }],
        total: 10
    };
    beforeAll(() => {
        const webApi = TestApplication.create();
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    test("list companies route finds company", async () => {
        TestApplication.context.listCompanyUseCase
            .list.mockResolvedValueOnce(toOk(companyPage));
        const res = await request(app).get('/api/v1/companies')
            .send().expect(200);

        const expectedBody = {
            total: companyPage.total,
            data: companyPage.data.map(company => ({...company, createdAt: company.createdAt.toISOString()}))
        }
        expect(res.body).toMatchObject(expectedBody);
    });

    test("list companies route does not find company", async () => {
        TestApplication.context.listCompanyUseCase
            .list.mockImplementationOnce(async ({limit, skip}) => toOk({
                data: Array(limit).fill(companyPage.data[0]),
                total: 100 - skip
            }));
        const {body: res} = await request(app)
            .get('/api/v1/companies')
            .send()
            .expect(200);
        
        expect(res.data).toHaveLength(10);
        expect(res.total).toEqual(100);
    });
});
