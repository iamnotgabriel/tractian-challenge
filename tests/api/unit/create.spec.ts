import { TestApplication } from "@/tests/main/test-application";
import request from "supertest";
import { Express } from "express";
import { getContext } from "@/resources/context/application";
import { CreateUnitDTO } from "@/domain/unit/entity";
import { CreateCompanyDTO } from "@/domain/company/entity";

describe('api/unit/create', () => {
    let app: Express;

    beforeAll(async () => {
        const webApi = await TestApplication.create(getContext);
        app = webApi.app; 
    });

    afterAll(async () => {
        await TestApplication.teardown()
    });

    async function createCompany() {
        const body: CreateCompanyDTO = {
            name: 'Cool company Inc.',
            document: '012345667',
        }
        const { body: res } = await request(app).post('/api/v1/companies').send(body).expect(201);

        return res.id
    }

    test("create unit", async () => {
        const companyId = await createCompany()
        const body: CreateUnitDTO = {
            name: 'API Testing company',
            companyId,
        }
        const {body: res, headers} = await request(app).post('/api/v1/units').send(body).expect(201);
        
        const contentLocation =  `http://localhost:8080/api/v1/units/${res.id}`;

        expect(headers['content-location']).toBe(contentLocation);
        expect(res).toMatchObject({
            ...body
        });
    });
});
